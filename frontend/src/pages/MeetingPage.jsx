import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MeetingPage = () => {

  const navigate = useNavigate();

  const [roomId, setRoomId] =
    useState("");

  // CREATE
  const createMeeting = () => {

    const id =
      Math.random()
        .toString(36)
        .substring(2, 8);

    console.log("NEW ROOM:", id);

    navigate(`/call/${id}`);
  };

  // JOIN
  const joinMeeting = () => {

    if (!roomId.trim()) {
      alert("Enter Room ID");
      return;
    }

    navigate(`/call/${roomId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#111827] to-black">

      <div className="w-[430px] bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/10 shadow-2xl">

        {/* ICON */}
        <div className="flex justify-center mb-5">
          <div className="bg-green-500 p-5 rounded-2xl text-4xl">
            🎥
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-white text-5xl font-bold text-center">
          Video Meeting
        </h1>

        <p className="text-zinc-300 text-center mt-3 mb-8">
          Create or join a meeting instantly
        </p>

        {/* CREATE */}
        <button
          onClick={createMeeting}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl text-2xl font-semibold transition"
        >
          + Create Meeting
        </button>

        {/* INPUT */}
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) =>
            setRoomId(e.target.value)
          }
          className="w-full mt-6 px-5 py-4 rounded-2xl bg-[#1e293b] text-white text-xl outline-none border border-zinc-700"
        />

        {/* JOIN */}
        <button
          onClick={joinMeeting}
          className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-2xl text-2xl font-semibold transition"
        >
          🔗 Join Meeting
        </button>

      </div>
    </div>
  );
};

export default MeetingPage;