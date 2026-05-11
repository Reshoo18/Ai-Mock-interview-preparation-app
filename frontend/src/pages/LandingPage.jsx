

import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  LuSparkles,
  LuFileText,
  LuVideo,
  LuBrain,
  LuArrowRight,
} from "react-icons/lu";

import { UserContext } from "../context/userContext";

import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Modal from "../component/Modal";
// no change
import ProfileInfoCard from "../component/Cards_temp/ProfileInfoCard";

const LandingPage = () => {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className="min-h-screen overflow-hidden bg-[#071028] text-white relative">

        {/* BACKGROUND GLOW */}
        <div className="absolute top-[-150px] left-[-100px] w-[450px] h-[450px] bg-purple-600/30 blur-[140px] rounded-full" />

        <div className="absolute bottom-[-150px] right-[-100px] w-[450px] h-[450px] bg-pink-500/20 blur-[140px] rounded-full" />

        {/* GRID */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* NAVBAR */}
        <nav className="relative z-20 max-w-7xl mx-auto px-6 lg:px-10 py-6">

          <div className="flex items-center justify-between backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-6 py-4">

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <LuSparkles className="text-xl" />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Interview Prep AI
                </h2>

                <p className="text-xs text-gray-400">
                  AI Career Copilot
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
              <button>Features</button>
              <button>ATS Checker</button>
              <button>Mock Interview</button>
              <button>Meeting</button>
            </div>

            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                onClick={() => setOpenAuthModal(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/20"
              >
                Login / Signup
              </button>
            )}
          </div>
        </nav>

        {/* HERO */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-28">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 text-sm mb-8">
                <LuSparkles />
                AI Powered Career Platform
              </div>

              <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight">

                Your AI Career
                <br />

                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Copilot
                </span>

                <br />

                for Interviews
              </h1>

              <p className="text-lg text-gray-400 leading-8 mt-8 max-w-xl">
                Practice interviews, analyze resumes, generate AI-powered
                questions, conduct mock sessions, and improve your ATS score —
                all in one futuristic platform.
              </p>

              <div className="flex flex-wrap gap-5 mt-10">

                <button
                  onClick={handleCTA}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-2xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-2xl shadow-purple-500/20"
                >
                  Get Started
                </button>

               
              </div>

              {/* STATS */}
              <div className="flex flex-wrap gap-10 mt-16">

                <div>
                  <h3 className="text-3xl font-bold">10k+</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    AI Questions
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold">92%</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    ATS Accuracy
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold">5k+</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Mock Sessions
                  </p>
                </div>
              </div>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >

              {/* MAIN DASHBOARD */}
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-6 shadow-2xl shadow-purple-500/10">

                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="font-bold text-2xl">
                      AI Dashboard
                    </h3>

                    <p className="text-gray-400 mt-1">
                      Career Intelligence System
                    </p>
                  </div>

                  <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse" />
                </div>

                {/* CARD */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-6 mb-6">

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-sm text-white/80">
                        ATS Resume Score
                      </p>

                      <h2 className="text-5xl font-black mt-2">
                        92%
                      </h2>
                    </div>

                    <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                      <LuFileText className="text-3xl" />
                    </div>
                  </div>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-2 gap-4">

                  <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                    <LuBrain className="text-3xl text-purple-400 mb-4" />

                    <h3 className="font-semibold">
                      AI Questions
                    </h3>

                    <p className="text-gray-400 text-sm mt-2">
                      Personalized interview prep
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                    <LuVideo className="text-3xl text-pink-400 mb-4" />

                    <h3 className="font-semibold">
                      Mock Sessions
                    </h3>

                    <p className="text-gray-400 text-sm mt-2">
                      Real-time AI interviews
                    </p>
                  </div>
                </div>
              </div>

              {/* FLOATING CARD */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="absolute -top-10 -right-10 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 shadow-xl"
              >
                <p className="text-sm text-gray-300">
                  AI Feedback
                </p>

                <h3 className="text-2xl font-bold mt-2">
                  Excellent
                </h3>

                <div className="mt-3 w-32 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="w-[85%] h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-32">

          <div className="text-center mb-20">

            <h2 className="text-5xl font-black">
              Everything You Need
            </h2>

            <p className="text-gray-400 text-lg mt-5">
              One platform for interviews, resumes, and AI career growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

            {[
              {
                icon: <LuBrain />,
                title: "AI Interview Prep",
                desc: "Generate role-specific interview questions instantly.",
              },

              {
                icon: <LuFileText />,
                title: "ATS Resume Checker",
                desc: "Analyze your resume and improve ATS compatibility.",
              },

              {
                icon: <LuVideo />,
                title: "AI Mock Interviews",
                desc: "Practice with intelligent AI interview simulations.",
              },

              {
                icon: <LuArrowRight />,
                title: "Video Meetings",
                desc: "Conduct live interview practice sessions easily.",
              },
            ].map((item, index) => (
              <motion.div
                whileHover={{ y: -8 }}
                key={index}
                className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[28px] p-8 hover:border-purple-500/30 transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-3xl mb-6">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-400 leading-7">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* WORKFLOW */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-32">

          <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 lg:p-20 backdrop-blur-2xl">

            <div className="text-center mb-20">

              <h2 className="text-5xl font-black">
                Your AI Career Workflow
              </h2>

              <p className="text-gray-400 text-lg mt-6">
                A complete journey from resume analysis to interview mastery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

              {[
                "Upload Resume",
                "Get ATS Score",
                "Generate Questions",
                "Start Mock Interview",
                "Track Progress",
              ].map((step, index) => (
                <div key={index} className="text-center">

                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mx-auto flex items-center justify-center text-2xl font-black mb-6">
                    {index + 1}
                  </div>

                  <h3 className="font-semibold text-lg">
                    {step}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10 pb-28 text-center">

          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-white/10 rounded-[40px] p-14 backdrop-blur-2xl">

            <h2 className="text-5xl font-black leading-tight">
              Start Your AI-Powered
              <br />
              Career Journey
            </h2>

            <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto leading-8">
              Prepare smarter, crack interviews faster, and stand out with
              AI-driven career tools.
            </p>

            <button
              onClick={handleCTA}
              className="mt-10 bg-gradient-to-r from-purple-500 to-pink-500 px-10 py-5 rounded-2xl text-lg font-bold hover:scale-105 transition-all duration-300 shadow-2xl shadow-purple-500/20"
            >
              Get Started
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 py-8 text-center text-gray-500 text-sm">
          Built with ❤️ using React, Tailwind & AI
        </footer>
      </div>

      {/* MODAL */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && (
            <Login setCurrentPage={setCurrentPage} />
          )}

          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;