import { Server } from "socket.io";
import pool from "./db.js";

export default function setupChat(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  // Ensure chat table exists
  const ensureTable = async () => {
    try {
      await pool.query(
        `CREATE TABLE IF NOT EXISTS chat_messages (
          id SERIAL PRIMARY KEY,
          room_id TEXT NOT NULL,
          sender_id TEXT NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMPTZ DEFAULT NOW()
        )`
      );
    } catch (err) {
      console.error("Failed to ensure chat_messages table:", err);
    }
  };

  ensureTable();

  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    // Join room - expect roomId as string
    socket.on("join-room", async (roomId) => {
      console.log(`🚪 ${socket.id} attempting to join room: ${roomId}`);
      socket.join(roomId);
      console.log(`✅ ${socket.id} joined room ${roomId}`);
      try {
        const { rows } = await pool.query(
          `SELECT sender_id AS "senderId", message, to_char(created_at, 'HH24:MI:SS') AS timestamp
           FROM chat_messages WHERE room_id = $1 ORDER BY created_at ASC LIMIT 200`,
          [roomId]
        );
        console.log(`📜 Sending chat history for room ${roomId}:`, rows.length);
        socket.emit("chat-history", rows);
      } catch (err) {
        console.error("Error loading chat history:", err);
        socket.emit("chat-history", []);
      }
    });

    // Leave room
    socket.on("leave-room", (roomId) => {
      socket.leave(roomId);
      console.log(`🚪 ${socket.id} left room ${roomId}`);
    });

    // Private message
    socket.on("private-message", async ({ roomId, message, senderId }) => {
      console.log(`💬 Received message in room ${roomId} from ${senderId}: ${message}`);
      
      const msg = { 
        senderId, 
        message, 
        timestamp: new Date().toLocaleTimeString() 
      };
      try {
        await pool.query(
          `INSERT INTO chat_messages (room_id, sender_id, message) VALUES ($1, $2, $3)`,
          [roomId, senderId, message]
        );
      } catch (err) {
        console.error("Failed to persist message:", err);
      }

      console.log(`📤 Broadcasting message to room ${roomId}`);
      io.to(roomId).emit("new-message", msg);
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });

  return io;
}