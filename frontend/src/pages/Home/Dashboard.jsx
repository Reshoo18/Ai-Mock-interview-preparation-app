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

  // FETCH SESSIONS
  const fetchSessions = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(res.data.sessions || []);
    } catch (err) {
      console.error("Error fetching sessions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  // 🔥 DELETE FUNCTION (THIS WAS MISSING)
  // const handleDeleteSession = async () => {
  //   try {
  //     const id = openDeleteAlert.data._id;

  //     console.log("Deleting ID:", id);

  //     await axiosInstance.delete(`/sessions/${id}`);

  //     // Close modal
  //     setOpenDeleteAlert({ open: false, data: null });

  //     // Refresh list
  //     fetchSessions();

  //   } catch (err) {
  //     console.error("Delete error:", err);
  //   }
  // };
   const handleDeleteSession = async () => {
  try {
    const id = openDeleteAlert.data._id;

    await axiosInstance.delete(
      API_PATHS.SESSION.DELETE(id)
    );

    setOpenDeleteAlert({ open: false, data: null });

    fetchSessions();

  } catch (err) {
    console.error("Delete error:", err);
  }
};

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">

        {loading && <p>Loading...</p>}

        {!loading && sessions.length === 0 && (
          <p>No sessions found</p>
        )}

        {sessions.map((s, i) => (
          <SummaryCard
            key={s._id}
            colors={CARD_BG[i % CARD_BG.length].bgcolor}
            role={s.role}
            experience={s.experience}
            topicsToFocus={s.topicsToFocus}
            questionsCount={s.questions?.length || 0}
            description={s.description}
            lastUpdated={moment(s.updatedAt).format("Do MMM YYYY")}
            onSelect={() => navigate("/interview-prep")}
            onDelete={() =>
              setOpenDeleteAlert({
                open: true,
                data: s,
              })
            }
          />
        ))}

        {/* ADD NEW BUTTON */}
        <button
          className="h-12 flex items-center justify-center gap-3 bg-orange-500 text-white px-7 py-2.5 rounded-full fixed bottom-20 right-20"
          onClick={() => setOpenCreateModal(true)}
        >
          <LuPlus className="text-2xl" />
          Add New
        </button>
      </div>

      {/* CREATE MODAL */}
      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
      >
        <CreateSessionForm />
      </Modal>

      {/* 🔥 DELETE MODAL */}
      <Modal
        isOpen={openDeleteAlert.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        hideHeader
      >
        <div className="p-6 text-center">
          <h2 className="text-lg font-semibold mb-4">
            Delete this session?
          </h2>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleDeleteSession}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Yes Delete
            </button>

            <button
              onClick={() =>
                setOpenDeleteAlert({ open: false, data: null })
              }
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

    </DashboardLayout>
  );
};

export default Dashboard;
