import React, {
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { Settings, LogOut } from "lucide-react";

import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";

const ProfileInfoCard = () => {

  const {
    user,
    clearUser,
    updateUser,
  } = useContext(UserContext);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [showModal, setShowModal] =
    useState(false);

  const [fieldType, setFieldType] =
    useState("");

  const [inputValue, setInputValue] =
    useState("");

  const dropdownRef = useRef(null);

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

  if (!user) return null;

  // LOGOUT
  const handleLogout = () => {

    localStorage.clear();

    clearUser();

    navigate("/");
  };

  // PHOTO UPLOAD
  const handlePhotoUpload = async (e) => {

    try {

      const file = e.target.files[0];

      if (!file) return;

      const formData = new FormData();

      formData.append("profileImage", file);

      const response = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_PROFILE_PHOTO,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      updateUser(response.data.user);

      setOpen(false);

    } catch (error) {
      console.log(error);
    }
  };

  // SAVE USER DATA
  const handleSave = async () => {

    try {

      const body = {
        [fieldType === "username"
          ? "name"
          : "email"]: inputValue,
      };

      const response = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_PROFILE,
        body
      );

      updateUser(response.data.user);

      setShowModal(false);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="relative flex items-center"
    >

      {/* PROFILE CARD */}
      <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-md">

        {/* PROFILE IMAGE */}
        <img
          src={
            user.profileImageUrl ||
            "/default-avatar.png"
          }
          alt="Profile"
          className="w-11 h-11 rounded-full object-cover border-2 border-pink-500"
        />

        {/* USER INFO */}
        <div className="hidden md:block">

          <h2 className="text-black text-sm font-semibold">
            {user.name || user.fullName}
          </h2>

          <p className="text-zinc-600 text-xs">
            Welcome Back
          </p>

        </div>

        {/* SETTINGS BUTTON */}
        <button
          onClick={() =>
            setOpen((prev) => !prev)
          }
          className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-black transition"
        >
          <Settings size={18} />
        </button>
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 top-16 w-72 bg-[#0f172a] border border-white/10 rounded-3xl p-4 shadow-2xl z-50">

          <h2 className="text-white text-xl font-bold mb-4">
            Profile Settings
          </h2>

          {/* CHANGE PHOTO */}
          <label className="w-full flex items-center px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white mb-3 cursor-pointer transition">

            Change Photo

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handlePhotoUpload}
            />
          </label>

          {/* CHANGE USERNAME */}
          <button
            onClick={() => {

              setFieldType("username");

              setInputValue(
                user.name || ""
              );

              setShowModal(true);

              setOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white mb-3 transition"
          >
            Change Username
          </button>

          {/* CHANGE EMAIL */}
          <button
            onClick={() => {

              setFieldType("email");

              setInputValue(
                user.email || ""
              );

              setShowModal(true);

              setOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white mb-3 transition"
          >
            Change Email
          </button>

          {/* SIGN OUT */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 transition"
          >

            <LogOut size={18} />

            Sign Out

          </button>
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100]">

          <div className="w-[90%] max-w-md bg-[#111827] border border-white/10 rounded-3xl p-6 shadow-2xl">

            <h2 className="text-2xl font-bold text-white mb-5">

              {fieldType === "username"
                ? "Change Username"
                : "Change Email"}

            </h2>

            <input
              type="text"
              value={inputValue}
              onChange={(e) =>
                setInputValue(
                  e.target.value
                )
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none mb-5"
              placeholder={
                fieldType === "username"
                  ? "Enter username"
                  : "Enter email"
              }
            />

            <div className="flex justify-end gap-3">

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="px-5 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold"
              >
                Save
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfoCard;