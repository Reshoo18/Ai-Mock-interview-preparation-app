import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MeetingPage = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");

  // create new meeting
  const createMeeting = () => {
    const newRoom = Math.random().toString(36).substring(2, 8);
    navigate(`/call/${newRoom}`);
  };

  // join existing meeting
  const joinMeeting = () => {
    if (!roomId.trim()) {
      alert("Enter Room ID ❌");
      return;
    }

    navigate(`/call/${roomId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">

      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-[350px]">

        <h2 className="text-xl font-semibold text-center mb-6">
          🎥 Video Meeting
        </h2>

        {/* CREATE */}
        <button
          onClick={createMeeting}
          className="w-full mb-4 py-2 bg-green-500 rounded-lg hover:bg-green-400 transition"
        >
          ➕ Create Meeting
        </button>

        {/* JOIN */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="px-3 py-2 rounded-lg bg-black/40 border border-white/20 outline-none"
          />

          <button
            onClick={joinMeeting}
            className="py-2 bg-blue-500 rounded-lg hover:bg-blue-400 transition"
          >
            🔗 Join Meeting
          </button>
        </div>

      </div>
    </div>
  );
};

export default MeetingPage;