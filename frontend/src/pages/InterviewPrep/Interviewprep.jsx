import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import moment from "moment"
import {AnimatePresence,motion} from "framer-motion"
import { LuCircleAlert,LuListCollapse } from "react-icons/lu"
import SpinnerLoader from "../../component/Loader/SpinnerLoader"
import {toast} from "react-hot-toast"


const InterviewPrep = () => {
  const {sessionId}=useParams();
  const [sessionData,setSessionData]=useState(null);
  const [errorMsg,setError]=useState("");

  const [openLeanMoreDrawer,setOpenLeanMoreDrawer]=useState(false);
  const [isLoading,setIsLoading]=useState(false);
  const [isUpdateLoader,setIsUpdateLoader]=useState(false);

  const fetchSessionDetailsById=async ()={};

  const generateConceptExplaination=async (question)={};


  const toggleQuestionPinStatus =async(question)={};

  const uploadMoreQuestions=async()={};

  useEffect(()=>{
    if(sessionId){
      fetchSessionDetailsById();
    }
    return ()=>{};
  },[])

  return (
    <div>InterviewPrep</div>
  )
}
export default InterviewPrep