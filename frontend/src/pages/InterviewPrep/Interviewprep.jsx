
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";

import SpinnerLoader from "../../component/Loader/SpinnerLoader";
import DashboardLayout from "../../component/layouts/DashboardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader";
import QuestionCard from "../../component/Cards/QuestionCard";

import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuCircleAlert } from "react-icons/lu";
import AIResponsePreview from "./components/AIResponsePreview.jsx";
import Drawer from "../../component/Drawer";
import SkeletonLoader from "../../component/Loader/SkeletonLoader";

const InterviewPrep = () => {
  const { id } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  /* ================= FETCH SESSION ================= */
  const fetchSessionDetailsById = async () => {
    try {
      const res = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(id)
      );

      setSessionData(res.data.session);
    } catch (err) {
      console.log("FETCH ERROR:", err);
    }
  };

  /* ================= GENERATE AI QUESTIONS ================= */
  const generateQuestions = async (session) => {
    try {
      console.log("🔥 Generating AI Questions...");
      setIsLoading(true);

      const aiRes = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTION,
        {
          role: session.role,
          experience: session.experience,
          topicsToFocus: session.topicsToFocus,
          numberOfQuestions: 10,
        }
      );

      const questionsData = Array.isArray(aiRes.data)
        ? aiRes.data
        : aiRes.data?.questions || [];

      if (questionsData.length === 0) {
        console.log("❌ No AI questions received");
        return;
      }

      console.log("✅ AI QUESTIONS:", questionsData);

      // Save in DB
      await axiosInstance.post(
        API_PATHS.QUESTIONS.ADD_TO_SESSIONS,
        {
          sessionId: session._id,
          questions: questionsData,
        }
      );

      console.log("✅ Saved to DB");

      // Refetch updated session
      await fetchSessionDetailsById();
    } catch (err) {
      console.log("GEN ERROR:", err);
    } finally {
      setIsLoading(false);
    }
  };

  /* ================= GENERATE EXPLANATION ================= */
  const generateConceptExplanation = async (question) => {
    try {
      setIsLoading(true);
      setOpenLearnMoreDrawer(true);
      setErrorMsg("");
      setExplanation(null);

      const res = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLAINATION,
        { question }
      );

      setExplanation(res.data);
    } catch (err) {
      setErrorMsg("Failed to generate explanation");
    } finally {
      setIsLoading(false);
    }
  };

  /* ================= PIN ================= */
  const toggleQuestionPinStatus = async (id) => {
    await axiosInstance.post(API_PATHS.QUESTIONS.PIN(id));

    setSessionData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q._id === id ? { ...q, isPinned: !q.isPinned } : q
      ),
    }));
  };

  /* ================= LOAD ================= */
  useEffect(() => {
    if (id) fetchSessionDetailsById();
  }, [id]);

  /* ================= AUTO AI GENERATE ================= */
 useEffect(() => {
  if (sessionData && sessionData._id) {
    
    // 🚨 CLEAR OLD QUESTIONS UI FIRST
    setSessionData((prev) => ({
      ...prev,
      questions: [],
    }));

    // 🚀 Generate new questions
    generateQuestions(sessionData);
  }
}, [sessionData?._id]);

  if (!sessionData) {
    return (
      <DashboardLayout>
        <SpinnerLoader />
      </DashboardLayout>
    );
  }

//   return (
//     <DashboardLayout>
//       <RoleInfoHeader
//         role={sessionData.role}
//         topicsToFocus={sessionData.topicsToFocus}
//         experience={sessionData.experience}
//         question={sessionData.questions.length}
//         description={sessionData.description}
//         lastUpdated={
//           sessionData.updatedAt
//             ? moment(sessionData.updatedAt).format("Do MMM YYYY")
//             : ""
//         }
//       />

//       <motion.div className="container mx-auto pt-4 pb-4">
//         <h2 className="text-lg font-semibold">
//           Interview Q & A
//         </h2>

//         <div className="mt-5">
//           {sessionData.questions.map((q) => (
//             <QuestionCard
//               key={q._id}
//               question={q.question}
//               answer={q.answer}
//               isPinned={q.isPinned}
//               onTogglePin={() =>
//                 toggleQuestionPinStatus(q._id)
//               }
//               onLearnMore={() =>
//                 generateConceptExplanation(q.question)
//               }
//             />
//           ))}
//         </div>
//       </motion.div>

//       {/* Drawer */}
//       <Drawer
//         isOpen={openLearnMoreDrawer}
//         onclose={() => setOpenLearnMoreDrawer(false)}
//         title={explanation?.title}
//       >
//         {errorMsg && <p>{errorMsg}</p>}
//         {isLoading && <SkeletonLoader />}
//         {!isLoading && explanation && (
//           <AIResponsePreview
//             content={explanation.explanation}
//           />
//         )}
//       </Drawer>
//     </DashboardLayout>
//   );
// };
return (
  <DashboardLayout>

    {/* 🔥 HERO SECTION */}
    <div className="mx-auto max-w-6xl px-4 pt-6">
      <div className="rounded-2xl p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl">

        <h1 className="text-2xl font-bold">{sessionData.role}</h1>
        <p className="opacity-90 mt-1">{sessionData.topicsToFocus}</p>

        <div className="flex flex-wrap gap-3 mt-4">
          <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm">
            Experience: {sessionData.experience} Years
          </span>

          <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm">
            {sessionData.questions.length} Q&A
          </span>

          <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm">
            {sessionData.updatedAt
              ? moment(sessionData.updatedAt).format("Do MMM YYYY")
              : ""}
          </span>
        </div>
      </div>
    </div>

    {/* 🔥 MAIN SECTION */}
    <motion.div className="container mx-auto pt-6 pb-6 px-4">

      <h2 className="text-xl font-semibold text-gray-800">
        Interview Q & A
      </h2>

      {/* QUESTIONS */}
      <div className="mt-5 space-y-4">
        {sessionData.questions  .sort((a, b) => b.isPinned - a.isPinned)
.map((q) => (
           
          <div key={q._id} className="hover:scale-[1.01] transition-all duration-200">
            <QuestionCard
             
              question={q.question}
              answer={q.answer}
              isPinned={q.isPinned}
              onTogglePin={() =>
                toggleQuestionPinStatus(q._id)
              }
              onLearnMore={() =>
                generateConceptExplanation(q.question)
              }
            />
          </div>
        ))}
      </div>

      {/* 🔥 LOAD MORE BUTTON */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => generateQuestions(sessionData)}
          disabled={isLoading}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg hover:scale-105 transition-all disabled:opacity-50"
        >
          {isLoading ? "Generating..." : "Load More Questions"}
        </button>
      </div>

      {/* 🔄 LOADER */}
      {isLoading && (
        <div className="flex justify-center mt-4">
          <SpinnerLoader />
        </div>
      )}
    </motion.div>

    {/* DRAWER */}
    <Drawer
      isOpen={openLearnMoreDrawer}
      onclose={() => setOpenLearnMoreDrawer(false)}
      title={explanation?.title}
    >
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      {isLoading && <SkeletonLoader />}
      {!isLoading && explanation && (
        <AIResponsePreview
          content={explanation.explanation}
        />
      )}
    </Drawer>

  </DashboardLayout>
);
};
export default InterviewPrep;
