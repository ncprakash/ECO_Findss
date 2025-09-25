import React, { useEffect, useRef, useState } from "react";
import { socket } from "@/socket.js";

const Chat = ({ currentUserId, sellerId, roomId }) => {
  const [messages, setMessages] = useState([]); // { message, senderId, timestamp }
  const [text, setText] = useState("");

  const joinedRef = useRef(false);

  useEffect(() => {
    if (!roomId || !currentUserId) {
      console.log("Missing roomId or currentUserId:", { roomId, currentUserId });
      return;
    }

    const joinIfNeeded = () => {
      if (!joinedRef.current && socket.connected) {
        console.log("Joining room:", roomId);
        socket.emit("join-room", roomId);
        joinedRef.current = true;
        console.log(`User ${currentUserId} joined room ${roomId}`);
      }
    };

    // Handle chat history
    const handleChatHistory = (history) => {
      console.log("Received chat history:", history);
      setMessages(history);
    };

    // Handle new messages
    const handleNewMessage = ({ senderId, message, timestamp }) => {
      console.log("Received new message:", { senderId, message, timestamp });
      setMessages((prev) => [...prev, { senderId, message, timestamp }]);
    };

    const handleConnect = () => {
      console.log("Socket connected, ensuring room join");
      joinedRef.current = false;
      joinIfNeeded();
    };

    const handleDisconnect = () => {
      console.log("Socket disconnected");
      joinedRef.current = false;
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("chat-history", handleChatHistory);
    socket.on("new-message", handleNewMessage);

    // Attempt to join immediately if already connected
    joinIfNeeded();
    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("chat-history", handleChatHistory);
      socket.off("new-message", handleNewMessage);
      socket.emit("leave-room", roomId);
      joinedRef.current = false;
    };
  }, [roomId, currentUserId]);

  const sendMessage = () => {
    if (!text.trim()) return;
    if (!roomId || !currentUserId) {
      console.error("Cannot send message: missing roomId or currentUserId", { roomId, currentUserId });
      return;
    }
    if (!socket.connected) {
      console.warn("Socket not connected, attempting reconnect before sending");
      socket.connect();
      return;
    }

    const payload = {
      roomId,
      message: text.trim(),
      senderId: currentUserId,
    };

    console.log("Sending message:", payload);
    socket.emit("private-message", payload);
    setText("");
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="w-96 flex flex-col">
      {/* Chat messages container */}
      <div className="min-h-[200px] max-h-[400px] border rounded-lg p-3 bg-white shadow-sm overflow-y-auto flex flex-col gap-2">
        {messages.length === 0 ? (
          <div className="text-gray-500 text-center py-4">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.senderId === currentUserId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow
                ${
                  m.senderId === currentUserId
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                <p className="text-xs opacity-70 mb-1">
                  {m.senderId === currentUserId ? "You" : `User ${m.senderId}`}
                </p>
                <p>{m.message}</p>
                {m.timestamp && (
                  <p className="text-xs opacity-50 mt-1">{m.timestamp}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input + send button */}
      <div className="mt-3 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={sendMessage}
          disabled={!text.trim()}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-xl shadow"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;