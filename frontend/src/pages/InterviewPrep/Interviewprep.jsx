import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import moment from "moment"
import {AnimatePresence,motion} from "framer-motion"
import { LuCircleAlert,LuListCollapse } from "react-icons/lu"
import SpinnerLoader from "../../component/Loader/SpinnerLoader"
import {toast} from "react-hot-toast"
import DashboardLayout from "../../component/layouts/DashboardLayout"
import RoleInfoHeader from "./components/RoleInfoHeader"
import axiosInstance from "../../utils/axiosinstance"
import { API_PATHS } from "../../utils/apiPaths"
import QuestionCard from "../../component/Cards/QuestionCard"


const InterviewPrep = () => {
  const {id}=useParams();
  const [sessionData,setSessionData]=useState(null);
  const [errorMsg,setError]=useState("");

  const [openLeanMoreDrawer,setOpenLeanMoreDrawer]=useState(false);
  const [isLoading,setIsLoading]=useState(false);
  const [isUpdateLoader,setIsUpdateLoader]=useState(false);

  const fetchSessionDetailsById=async ()=>{
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(id)
      );
      if(response.data && response.data.session){
        setSessionData(response.data.session)
      }
    } catch (error) {
      console.log("Error:",error)
    }
  };

  const generateConceptExplaination=async (question)=>{};


  const toggleQuestionPinStatus =async(questionId)=>{};

  const uploadMoreQuestions=async()=>{};

  useEffect(()=>{
    if(id){
      fetchSessionDetailsById();
    }
    return ()=>{};
  },[]);

  return (
    <DashboardLayout>
      <RoleInfoHeader
         role={sessionData?.role || ""}
         topicsToFocus={sessionData?.topicsToFocus || ""}
         experience={sessionData?.experience || "-"}
         question={sessionData?.question?.length || "-"}
         description={sessionData?.description ||""}
         lastUpdated={
          sessionData?.updatedAt
          ? moment(sessionData.updatedAt).format("DO MM YYYY")
          : ""
         }
         />
         <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
          <h2 className="text-lg font-semibold color-black">Interview Q & A</h2>
          <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
            <div className={`col-span-12 ${
                    openLeanMoreDrawer ? "md:col-span-7" : "md:col-span-8"} ` }>

                      <AnimatePresence>
                        {sessionData?.questions?.map((data,index)=>{
                          return(
                            <motion.div
                            key={data._id || index}
                            initial={{opacity:0,y:-20}}
                            animate={{opacity:1,y:0}}
                            exit={{opacity:0,scale:0.95}}
                            transition={{
                              duration:0.4,
                              type:"spring",
                              stiffness:100,
                              delay:index*0.1,
                              damping:15,
                            }}
                            layout
                            layoutId={`question-${data._id ||index}`} >
                              <>
                              <QuestionCard
                                question={data?.question}
                                answer={data?.answer}
                                onLearnMore={()=>
                                  generateConceptExplaination(data.question)
                                }
                                isPinned={data?.isPinned}
                                onTogglePin={()=>toggleQuestionPinStatus(data._id)} />
                                </>
                                </motion.div>
                          );
                        })}
                      </AnimatePresence>
            </div>

          </div>
         </div>
    </DashboardLayout>
  )
}
export default InterviewPrep