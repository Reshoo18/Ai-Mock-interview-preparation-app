

// import React, { useEffect, useState } from "react";
// import DashboardLayout from "../../component/layouts/DashboardLayout";
// import axiosInstance from "../../utils/axiosinstance";
// import { LuPlus } from "react-icons/lu";
// import { API_PATHS } from "../../utils/apiPaths";
// import SummaryCard from "../../component/Cards/SummaryCard";
// import Modal from "../../component/Modal";
// import { CARD_BG } from "../../utils/data";
// import moment from "moment";
// import { useNavigate } from "react-router-dom";
// import CreateSessionForm from "./CreateSessionForm";

// const Dashboard = () => {
//   const [sessions, setSessions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openCreateModal, setOpenCreateModal] = useState(false);

//   const [openDeleteAlert, setOpenDeleteAlert] = useState({
//     open: false,
//     data: null,
//   });

//   const navigate = useNavigate();

//   // ✅ FETCH SESSIONS
//   const fetchSessions = async () => {
//     try {
//       const res = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);

//       console.log("API response:", res.data);

//       // Normalize response into array
//       if (Array.isArray(res.data.sessions)) {
//         setSessions(res.data.sessions);
//       } else if (res.data.session) {
//         setSessions([res.data.session]);
//       } else {
//         setSessions([]);
//       }

//     } catch (err) {
//       console.error("Error fetching sessions:", err);
//       setSessions([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSessions();
//   }, []);

//   // ✅ DELETE SESSION
//   const handleDeleteSession = async () => {
//     try {
//       const id = openDeleteAlert.data._id;

//       await axiosInstance.delete(API_PATHS.SESSION.DELETE(id));

//       setOpenDeleteAlert({ open: false, data: null });

//       fetchSessions();
//     } catch (err) {
//       console.error("Delete error:", err);
//     }
//   };

//   return (
//     <DashboardLayout>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">

//         {loading && <p>Loading...</p>}
// {/* 
//         {!loading && sessions.length === 0 && (
//           <p>No sessions found</p>
//         )} */}
//         {!loading && sessions.length === 0 && (
//   <div className="flex flex-col items-center justify-center h-[70vh] text-center">

//     {/* 🌈 Background Glow */}
//     <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 -z-10"></div>

//     {/* 💎 Card */}
//     <div className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/40 max-w-md">

//       {/* 🎯 Icon */}
//       <div className="text-5xl mb-4">📂</div>

//       {/* ✨ Title */}
//       <h2 className="text-xl font-semibold text-gray-800">
//         No Sessions Yet
//       </h2>

//       {/* 💬 Subtitle */}
//       <p className="text-gray-500 mt-2">
//         Start your interview preparation by creating your first session.
//       </p>

//       {/* 🚀 Button */}
//       <button
//         onClick={() => setOpenCreateModal(true)}
//         className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full shadow-md hover:scale-105 transition"
//       >
//         + Create Session
//       </button>
//     </div>
//   </div>
// )}

//         {sessions.map((s, i) => (
//   <SummaryCard
//     key={s._id}
//     index={i}   // 🔥 ADD THIS LINE
//     colors={CARD_BG[i % CARD_BG.length].bgcolor}
//     role={s.role}
//     experience={s.experience}
//     topicsToFocus={s.topicsToFocus}
//     questionsCount={s.questions?.length || 0}
//     description={s.description}
//     lastUpdated={moment(s.updatedAt).format("Do MMM YYYY")}
//     onSelect={() => navigate(`/interview-prep/${s._id}`)}
//     onDelete={() =>
//       setOpenDeleteAlert({
//         open: true,
//         data: s,
//       })
//     }
//   />
// ))}

//         {/* ✅ ADD NEW BUTTON */}
//         <button
//           className="h-12 flex items-center justify-center gap-3 bg-orange-500 text-white px-7 py-2.5 rounded-full fixed bottom-20 right-20"
//           onClick={() => setOpenCreateModal(true)}
//         >
//           <LuPlus className="text-2xl" />
//           Add New
//         </button>
//       </div>

//       {/* ✅ CREATE MODAL */}
//       <Modal
//         isOpen={openCreateModal}
//         onClose={() => setOpenCreateModal(false)}
//         hideHeader
//       >
//         <CreateSessionForm onSuccess={fetchSessions} />
//       </Modal>

//       {/* ✅ DELETE MODAL */}
//       <Modal
//         isOpen={openDeleteAlert.open}
//         onClose={() => setOpenDeleteAlert({ open: false, data: null })}
//         hideHeader
//       >
//         <div className="p-6 text-center">
//           <h2 className="text-lg font-semibold mb-4">
//             Delete this session?
//           </h2>

//           <div className="flex justify-center gap-4">
//             <button
//               onClick={handleDeleteSession}
//               className="bg-red-500 text-white px-4 py-2 rounded"
//             >
//               Yes Delete
//             </button>

//             <button
//               onClick={() =>
//                 setOpenDeleteAlert({ open: false, data: null })
//               }
//               className="bg-gray-300 px-4 py-2 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </Modal>

//     </DashboardLayout>
//   );
// };

// export default Dashboard;

// import React, { useEffect, useState } from "react";
// import DashboardLayout from "../../component/layouts/DashboardLayout";
// import axiosInstance from "../../utils/axiosinstance";
// import { LuPlus } from "react-icons/lu";
// import { API_PATHS } from "../../utils/apiPaths";
// import SummaryCard from "../../component/Cards/SummaryCard";
// import Modal from "../../component/Modal";
// import { CARD_BG } from "../../utils/data";
// import moment from "moment";
// import { useNavigate } from "react-router-dom";
// import CreateSessionForm from "./CreateSessionForm";

// const Dashboard = () => {
//   const [sessions, setSessions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openCreateModal, setOpenCreateModal] = useState(false);

//   const [openDeleteAlert, setOpenDeleteAlert] = useState({
//     open: false,
//     data: null,
//   });

//   const navigate = useNavigate();

//   // ✅ FETCH SESSIONS
//   const fetchSessions = async () => {
//     try {
//       const res = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);

//       if (Array.isArray(res.data.sessions)) {
//         setSessions(res.data.sessions);
//       } else if (res.data.session) {
//         setSessions([res.data.session]);
//       } else {
//         setSessions([]);
//       }
//     } catch (err) {
//       console.error("Error fetching sessions:", err);
//       setSessions([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSessions();
//   }, []);

//   // ✅ DELETE SESSION
//   const handleDeleteSession = async () => {
//     try {
//       const id = openDeleteAlert.data._id;

//       await axiosInstance.delete(API_PATHS.SESSION.DELETE(id));

//       setOpenDeleteAlert({ open: false, data: null });

//       fetchSessions();
//     } catch (err) {
//       console.error("Delete error:", err);
//     }
//   };

//   return (
//     <DashboardLayout>
//       {/* 🔥 DARK BACKGROUND */}
//       <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] p-6">

//         {/* GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

//           {loading && (
//             <p className="text-white">Loading...</p>
//           )}

//           {/* ❌ NO SESSION UI (DARK) */}
//           {!loading && sessions.length === 0 && (
//             <div className="col-span-full flex flex-col items-center justify-center h-[70vh] text-center">

//               <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/10 max-w-md">

//                 <div className="text-5xl mb-4">📂</div>

//                 <h2 className="text-xl font-semibold text-white">
//                   No Sessions Yet
//                 </h2>

//                 <p className="text-gray-400 mt-2">
//                   Start your interview preparation by creating your first session.
//                 </p>

//                 <button
//                   onClick={() => setOpenCreateModal(true)}
//                   className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full shadow-md hover:scale-105 transition"
//                 >
//                   + Create Session
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* ✅ SESSION CARDS */}
//           {sessions.map((s, i) => (
//             <SummaryCard
//               key={s._id}
//               index={i} // 🔥 important for dynamic colors
//               colors={CARD_BG[i % CARD_BG.length].bgcolor}
//               role={s.role}
//               experience={s.experience}
//               topicsToFocus={s.topicsToFocus}
//               questionsCount={s.questions?.length || 0}
//               description={s.description}
//               lastUpdated={moment(s.updatedAt).format("Do MMM YYYY")}
//               onSelect={() => navigate(`/interview-prep/${s._id}`)}
//               onDelete={() =>
//                 setOpenDeleteAlert({
//                   open: true,
//                   data: s,
//                 })
//               }
//             />
//           ))}
//         </div>

//         {/* ➕ ADD BUTTON */}
//         <button
//           className="h-12 flex items-center justify-center gap-3 bg-orange-500 text-white px-7 py-2.5 rounded-full fixed bottom-20 right-20 shadow-lg hover:scale-105 transition"
//           onClick={() => setOpenCreateModal(true)}
//         >
//           <LuPlus className="text-2xl" />
//           Add New
//         </button>
//       </div>

//       {/* ✅ CREATE MODAL */}
//       <Modal
//         isOpen={openCreateModal}
//         onClose={() => setOpenCreateModal(false)}
//         hideHeader
//       >
//         <CreateSessionForm onSuccess={fetchSessions} />
//       </Modal>

//       {/* ✅ DELETE MODAL */}
//       <Modal
//         isOpen={openDeleteAlert.open}
//         onClose={() => setOpenDeleteAlert({ open: false, data: null })}
//         hideHeader
//       >
//         <div className="p-6 text-center">
//           <h2 className="text-lg font-semibold mb-4 text-white">
//             Delete this session?
//           </h2>

//           <div className="flex justify-center gap-4">
//             <button
//               onClick={handleDeleteSession}
//               className="bg-red-500 text-white px-4 py-2 rounded"
//             >
//               Yes Delete
//             </button>

//             <button
//               onClick={() =>
//                 setOpenDeleteAlert({ open: false, data: null })
//               }
//               className="bg-gray-300 px-4 py-2 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </DashboardLayout>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import DashboardLayout from "../../component/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosinstance";
import { LuPlus } from "react-icons/lu";
import { API_PATHS } from "../../utils/apiPaths";
import SummaryCard from "../../component/Cards/SummaryCard";
import Modal from "../../component/Modal";
import { CARD_BG } from "../../utils/data";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import CreateSessionForm from "./CreateSessionForm";

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const navigate = useNavigate();

  const fetchSessions = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);

      if (Array.isArray(res.data.sessions)) {
        setSessions(res.data.sessions);
      } else if (res.data.session) {
        setSessions([res.data.session]);
      } else {
        setSessions([]);
      }
    } catch (err) {
      console.error("Error fetching sessions:", err);
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleDeleteSession = async () => {
    try {
      const id = openDeleteAlert.data._id;
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(id));
      setOpenDeleteAlert({ open: false, data: null });
      fetchSessions();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] p-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {loading && <p className="text-white">Loading...</p>}

          {!loading && sessions.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center h-[70vh] text-center">
              <div className="bg-white/10 p-8 rounded-2xl shadow-xl border border-white/10 max-w-md">
                <h2 className="text-xl text-white">No Sessions</h2>
                <button
                  onClick={() => setOpenCreateModal(true)}
                  className="mt-4 bg-purple-500 text-white px-6 py-2 rounded-full"
                >
                  + Create Session
                </button>
              </div>
            </div>
          )}

          {sessions.map((s, i) => (
            <SummaryCard
              key={s._id}
              id={s._id}   // 🔥 IMPORTANT
              index={i}
              colors={CARD_BG[i % CARD_BG.length].bgcolor}
              role={s.role}
              experience={s.experience}
              topicsToFocus={s.topicsToFocus}
              questionsCount={s.questions?.length || 0}
              description={s.description}
              lastUpdated={moment(s.updatedAt).format("Do MMM YYYY")}
              onSelect={() => navigate(`/interview-prep/${s._id}`)}
              onDelete={() =>
                setOpenDeleteAlert({
                  open: true,
                  data: s,
                })
              }
            />
          ))}
        </div>

        <button
          className="h-12 flex items-center justify-center gap-3 bg-orange-500 text-white px-7 py-2.5 rounded-full fixed bottom-20 right-20"
          onClick={() => setOpenCreateModal(true)}
        >
          <LuPlus />
          Add New
        </button>
      </div>

      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
      >
        <CreateSessionForm onSuccess={fetchSessions} />
      </Modal>

      <Modal
        isOpen={openDeleteAlert.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        hideHeader
      >
        <div className="p-6 text-center">
          <h2 className="text-white">Delete this session?</h2>
          <button onClick={handleDeleteSession}>Yes</button>
        </div>
      </Modal>

    </DashboardLayout>
  );
};

export default Dashboard;