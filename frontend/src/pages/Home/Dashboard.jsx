import React, { useEffect, useState } from 'react'
import {LuPlus} from "react-icons/lu";
import { CARD_BG } from '../../utils/data';
import toast from "react-hot-toast";
import DashboardLayout from '../../component/layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
    const navigate=useNavigate();
    const [openCreateModal,setOpenCreateModal]=useState(false);
    const [session,setSession]=useState([]);

    const [openDeleteAlert,setOpenDeleteAlert]=useState({
        open: false,
        data: null,
    });

    const fetchAllSessions=async () =>{

    };

    const deleteSessions = async (sessionData) =>{};
    useEffect(()=>{
        fetchAllSessions();
    },[])

  return (
    <div>
      <DashboardLayout>
        <div className=''>
            <div className=''>

            </div>
            <button className='' onClick={()=>setOpenCreateModal(true)}>
                <LuPlus className=''/>
                Add New
            </button>
        </div>
      </DashboardLayout>
    </div>
  )
}

export default Dashboard
