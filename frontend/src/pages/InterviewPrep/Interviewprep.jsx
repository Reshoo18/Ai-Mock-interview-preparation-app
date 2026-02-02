import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import moment from "moment"
import {AnimatePresence,motion} from "framer-motion"
import { LuCircleAlert,LuListCollapse } from "react-icons/lu"
import SpinnerLoader from "../../component/Loader/SpinnerLoader"
import {toast} from "react-hot-toast"
import DashboardLayout from "../../component/layouts/DashboardLayout"
import RoleInfoHeader from "./components/RoleInfoHeader"


const InterviewPrep = () => {
  const {sessionId}=useParams();
  const [sessionData,setSessionData]=useState(null);
  const [errorMsg,setError]=useState("");

  const [openLeanMoreDrawer,setOpenLeanMoreDrawer]=useState(false);
  const [isLoading,setIsLoading]=useState(false);
  const [isUpdateLoader,setIsUpdateLoader]=useState(false);

  const fetchSessionDetailsById=async ()=>{};

  const generateConceptExplaination=async (question)=>{};


  const toggleQuestionPinStatus =async(questionId)=>{};

  const uploadMoreQuestions=async()=>{};

  useEffect(()=>{
    if(sessionId){
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
    </DashboardLayout>
  )
}
export default InterviewPrep