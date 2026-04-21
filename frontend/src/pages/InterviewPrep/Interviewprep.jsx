

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
  
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [sessionData, setSessionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  /* =========================
     FETCH SESSION
  ========================= */
  const fetchSessionDetailsById = async () => {
    try {
      const res = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(id)
      );

      if (res.data?.session) {
        console.log("SESSION FETCHED:", res.data.session);
        setSessionData(res.data.session);
      }
    } catch (err) {
      console.log("FETCH ERROR:", err);
    }
  };

  const generateConceptExplantion=async (question)=>{
    try{
      setErrorMsg("")
      setExplanation(null)

      setIsLoading(true);
      setOpenLearnMoreDrawer(true)

       const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        {
          question,
        }
       );

       if(response.data){
        setExplanation(response.data)
       }
    }catch (error) {
      setExplanation(null)
      setErrorMsg("Failed to generate explaination, try again later");
      console.log("ERROR",error)
    }finally{
      setIsLoading(false);
    }
  }


  /* =========================
     GENERATE QUESTIONS
  ========================= */
  const generateQuestions = async (session) => {
    try {
      setIsLoading(true);

      console.log("Generating AI questions...");

      const aiRes = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTION,
        {
          role: session.role,
          experience: session.experience,
          topicsToFocus: session.topicsToFocus,
          numberOfQuestions: 5,
        }
      );

      if (!Array.isArray(aiRes.data)) {
        console.log("Invalid AI format");
        return;
      }

      console.log("AI QUESTIONS:", aiRes.data);

      // Save to DB
      await axiosInstance.post(
        API_PATHS.QUESTIONS.ADD_TO_SESSIONS,
        {
          sessionId: session._id,
          questions: aiRes.data,
        }
      );

      console.log("Saved to DB");

      // 🔥 Refetch session
      await fetchSessionDetailsById();

    } catch (err) {
      console.log("GEN ERROR:", err);
    } finally {
      setIsLoading(false);
    }
  };



  const toggleQuestionPinStatus = async (questionId) => {
  try {
    console.log("Clicked:", questionId);

    await axiosInstance.post(
      API_PATHS.QUESTIONS.PIN(questionId)
    );

    // ✅ Instant UI update
    setSessionData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q._id === questionId
          ? { ...q, isPinned: !q.isPinned }
          : q
      ),
    }));

  } catch (error) {
    console.error("PIN ERROR:", error);
  }
};
  /* =========================
     USE EFFECT
  ========================= */
  useEffect(() => {
    if (id) fetchSessionDetailsById();
  }, [id]);

  /* =========================
     AUTO GENERATE IF EMPTY
  ========================= */
  useEffect(() => {
    if (
      sessionData &&
      (!sessionData.questions ||
        sessionData.questions.length === 0)
    ) {
      generateQuestions(sessionData);
    }
  }, [sessionData]);

  /* =========================
     DEBUG LOG
  ========================= */
  useEffect(() => {
    console.log("FRONTEND SESSION:", sessionData);
  }, [sessionData]);

  /* =========================
     LOADER
  ========================= */
  if (isLoading || !sessionData) {
    return (
      <DashboardLayout>
        <SpinnerLoader />
      </DashboardLayout>
    );
  }

  /* =========================
     RENDER
  ========================= */
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
            ? moment(sessionData.updatedAt).format(
                "Do MMM YYYY"
              )
            : ""
        }
      />

      <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
        <h2 className="text-lg font-semibold">
          Interview Q & A
        </h2>

        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
          <div className="col-span-12 md:col-span-8">
            <AnimatePresence>
              {sessionData.questions.map(
                (data, index) => (
                  <motion.div
                    key={data._id}
                    initial={{
                      opacity: 0,
                      y: -20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.95,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1,
                    }}
                  >
                    {/* <QuestionCard
                      question={data.question}
                      answer={data.answer}
                      isPinned={data.isPinned}
                    /> */}
                    <QuestionCard
  question={data.question}
  answer={`
## React State

**useState** is a hook that allows functional components to manage state.

### 🔹 Key Points

- State is a built-in object
- It allows components to create dynamic UI
- Updating state triggers re-render

### 🔹 Example

\`\`\`js
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

### 🔹 Notes

- State updates are asynchronous
- Always use setter function
`}
  onLearnMore={()=>
    generateConceptExplantion(data.question)
  }
  isPinned={data.isPinned}
  onTogglePin={() => toggleQuestionPinStatus(data._id)}
/>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
        </div>

         <div>
            <Drawer
             isOpen={openLearnMoreDrawer}
             onclose={()=>setOpenLearnMoreDrawer(false)}
             title={!isLoading && explanation?.title}>
               {errorMsg && (
                <p className="flex gap-2 text-sm text-amber-600" font-medium>
                  <LuCircleAlert className="mt-1"/>{errorMsg}
                </p>
               )}
               {isLoading && <SkeletonLoader />}
               {!isLoading && explanation && (
                <AIResponsePreview content={explanation?.explanation}/>
               )}

             </Drawer>
         </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
