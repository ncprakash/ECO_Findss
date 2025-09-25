import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Chat from "@/components/chatCard";

export default function ChatRoom() {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const currentUserId = localStorage.getItem("user_id");

    if (!currentUserId) {
        navigate("/login");
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto px-6 py-8">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Chat Room</h1>
                    <p className="text-gray-600 text-sm mt-1">Room: {roomId}</p>
                </div>
                <div className="bg-white rounded-xl border shadow-sm p-4">
                    <Chat currentUserId={currentUserId} roomId={roomId} />
                </div>
            </div>
        </div>
    );
}


