// import React, { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import moment from "moment"
// import {AnimatePresence,motion} from "framer-motion"
// import { LuCircleAlert,LuListCollapse } from "react-icons/lu"
// import SpinnerLoader from "../../component/Loader/SpinnerLoader"
// import {toast} from "react-hot-toast"
// import DashboardLayout from "../../component/layouts/DashboardLayout"
// import RoleInfoHeader from "./components/RoleInfoHeader"
// import axiosInstance from "../../utils/axiosinstance"
// import { API_PATHS } from "../../utils/apiPaths"
// import QuestionCard from "../../component/Cards/QuestionCard"
 


// const InterviewPrep = () => {
//   const {id}=useParams();
//   const [sessionData,setSessionData]=useState(null);
//   const [errorMsg,setError]=useState("");
  


//   const [openLeanMoreDrawer,setOpenLeanMoreDrawer]=useState(false);
//   const [isLoading,setIsLoading]=useState(false);
//   const [isUpdateLoader,setIsUpdateLoader]=useState(false);

//   const fetchSessionDetailsById=async ()=>{
//     try {
//       const response = await axiosInstance.get(
//         API_PATHS.SESSION.GET_ONE(id)
//       );
//       if(response.data && response.data.session){
//         setSessionData(response.data.session)
//       }
//     } catch (error) {
//       console.log("Error:",error)
//     }
//     console.log(sessionData);

//   };
  

//   const generateConceptExplaination=async (question)=>{};


//   const toggleQuestionPinStatus =async(questionId)=>{};

//   const uploadMoreQuestions=async()=>{};

//   useEffect(()=>{
//     if(id){
//       fetchSessionDetailsById();
//     }
//     return ()=>{};
//   },[]);

//   return (
//     <DashboardLayout>
//       <RoleInfoHeader
//          role={sessionData?.role || ""}
//          topicsToFocus={sessionData?.topicsToFocus || ""}
//          experience={sessionData?.experience || "-"}
//          question={sessionData?.questions?.length || "-"}
//          description={sessionData?.description ||""}
//          lastUpdated={
//           sessionData?.updatedAt
//           ? moment(sessionData.updatedAt).format("DO MM YYYY")
//           : ""
//          }
//          />
//          <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
//           <h2 className="text-lg font-semibold color-black">Interview Q & A</h2>
//           <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
//             <div className={`col-span-12 ${
//                     openLeanMoreDrawer ? "md:col-span-7" : "md:col-span-8"} ` }>

//                       <AnimatePresence>
//                         {sessionData?.questions?.map((data,index)=>{
//                           return(
//                             <motion.div
//                             key={data._id || index}
//                             initial={{opacity:0,y:-20}}
//                             animate={{opacity:1,y:0}}
//                             exit={{opacity:0,scale:0.95}}
//                             transition={{
//                               duration:0.4,
//                               type:"spring",
//                               stiffness:100,
//                               delay:index*0.1,
//                               damping:15,
//                             }}
//                             layout
//                             layoutId={`question-${data._id ||index}`} >
//                               <>
//                               <QuestionCard
//                                 question={data?.question}
//                                 answer={data?.answer}
//                                 onLearnMore={()=>
//                                   generateConceptExplaination(data.question)
//                                 }
//                                 isPinned={data?.isPinned}
//                                 onTogglePin={()=>toggleQuestionPinStatus(data._id)} />
//                                 </>
//                                 </motion.div>
//                           );
//                         })}
//                       </AnimatePresence>
//             </div>

//           </div>
//          </div>
//     </DashboardLayout>
//   )
// }
// export default InterviewPrep

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

const InterviewPrep = () => {
  const { id } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
                    <QuestionCard
                      question={data.question}
                      answer={data.answer}
                      isPinned={data.isPinned}
                    />
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
