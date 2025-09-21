import React, { useEffect, useState } from "react";
import {socket} from "../socket.js" // import your socket instance

export default function Chat({ currentUserId, sellerId }) {
  const [roomId, setRoomId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // generate room ID
    const rID = [currentUserId, sellerId].sort().join("_");
    setRoomId(rID);

    // connect socket
    socket.connect();

    // join room
    socket.emit("join-room", { roomId: rID });

    // listen for chat history
    socket.on("chat-history", (history) => {
      setMessages(history);
    });

    // listen for new messages
    socket.on("new-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // cleanup on unmount
    return () => {
      socket.off("chat-history");
      socket.off("new-message");
      socket.disconnect();
    };
  }, [currentUserId, sellerId]);

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("private-message", { roomId, message, senderId: currentUserId });
    setMessage("");
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", width: "300px" }}>
      <h3>Chat</h3>
      <div
        style={{
          height: "200px",
          overflowY: "auto",
          border: "1px solid #eee",
          padding: "0.5rem",
          marginBottom: "0.5rem",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>
            <b>{msg.senderId === currentUserId ? "You" : "Seller"}:</b> {msg.message}
          </div>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        style={{ width: "70%" }}
      />
      <button onClick={sendMessage} style={{ width: "28%", marginLeft: "2%" }}>
        Send
      </button>
    </div>
  );
}
