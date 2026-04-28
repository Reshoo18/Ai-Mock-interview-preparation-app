import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";

const InterviewSetup = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [count, setCount] = useState(10);

  const [loading, setLoading] = useState(false);

  // 🔥 START INTERVIEW
  const startInterview = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.post(
        "/api/ai/generate-question",
        {
          role,
          experience: "1 year",
          topicsToFocus: role,
          numberOfQuestions: count,
          difficulty,
        }
      );

      const questions = res.data;

      navigate("/interview/start", {
        state: {
          questions,
          role,
          difficulty,
        },
      });

    } catch (err) {
      console.log("Interview Error:", err);
      alert("Failed to generate interview");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] flex items-center justify-center p-6">

      <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">

        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          🎤 AI Mock Interview
        </h1>

        {/* ROLE */}
        <div className="mb-5">
          <label className="text-gray-300 block mb-2">
            Interview Role
          </label>

          <input
            type="text"
            placeholder="Backend Developer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/10 text-white outline-none"
          />
        </div>

        {/* DIFFICULTY */}
        <div className="mb-5">
          <label className="text-gray-300 block mb-2">
            Difficulty
          </label>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/10 text-white outline-none"
          >
            <option value="easy" className="text-black">
              Easy
            </option>

            <option value="medium" className="text-black">
              Medium
            </option>

            <option value="hard" className="text-black">
              Hard
            </option>
          </select>
        </div>

        {/* QUESTION COUNT */}
        <div className="mb-8">
          <label className="text-gray-300 block mb-2">
            Number of Questions
          </label>

          <input
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/10 text-white outline-none"
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={startInterview}
          disabled={loading}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold hover:scale-[1.02] transition"
        >
          {loading ? "Generating Questions..." : "Start Interview"}
        </button>

      </div>
    </div>
  );
};

export default InterviewSetup;