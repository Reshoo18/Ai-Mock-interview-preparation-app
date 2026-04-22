
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
import AIResponsePreview from "./components/AIResponsePreview";
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
          numberOfQuestions: 5,
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

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData.role}
        topicsToFocus={sessionData.topicsToFocus}
        experience={sessionData.experience}
        question={sessionData.questions.length}
        description={sessionData.description}
        lastUpdated={
          sessionData.updatedAt
            ? moment(sessionData.updatedAt).format("Do MMM YYYY")
            : ""
        }
      />

      <div className="container mx-auto pt-4 pb-4">
        <h2 className="text-lg font-semibold">
          Interview Q & A
        </h2>

        <div className="mt-5">
          {sessionData.questions.map((q) => (
            <QuestionCard
              key={q._id}
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
          ))}
        </div>
      </div>

      {/* Drawer */}
      <Drawer
        isOpen={openLearnMoreDrawer}
        onclose={() => setOpenLearnMoreDrawer(false)}
        title={explanation?.title}
      >
        {errorMsg && <p>{errorMsg}</p>}
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