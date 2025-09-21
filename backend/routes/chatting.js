// chatting.js
import { Server } from "socket.io"; // must be top-level import

export default function setupChat(server) {
  const io = new Server(server, {
    cors: {
      origin: "*", // or your frontend URL
      methods: ["GET", "POST"]
    }
  });

  let messages = {}; // in-memory storage for rooms

  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    // Join room
    socket.on("join-room", ({ roomId }) => {
      socket.join(roomId);
      console.log(`${socket.id} joined room ${roomId}`);

      if (messages[roomId]) {
        socket.emit("chat-history", messages[roomId]);
      } else {
        messages[roomId] = [];
      }
    });

    // Private message
    socket.on("private-message", ({ roomId, message, senderId }) => {
      const msg = { senderId, message, timestamp: new Date().toLocaleTimeString() };
      messages[roomId].push(msg);

      socket.to(roomId).emit("new-message", msg); // send to others in room
      socket.emit("new-message", msg);           // send back to sender
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });

  return io;
}
