import React, {
  useContext,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import { UserContext } from "../../context/userContext";

import {
  Settings,
  LogOut,
} from "lucide-react";

const ProfileInfoCard = () => {
  const { user, clearUser } =
    useContext(UserContext);

  const navigate = useNavigate();

  const [open, setOpen] =
    useState(false);

  const [showModal, setShowModal] =
    useState(false);

  const [fieldType, setFieldType] =
    useState("");

  const [inputValue, setInputValue] =
    useState("");

  if (!user) return null;

  // LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  // PHOTO UPLOAD
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const imageUrl =
      URL.createObjectURL(file);

    const updatedUser = {
      ...user,
      profileImageUrl: imageUrl,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    window.location.reload();
  };

  // SAVE USER DATA
  const handleSave = () => {
    const updatedUser = {
      ...user,

      [fieldType === "username"
        ? "name"
        : "email"]: inputValue,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setShowModal(false);

    window.location.reload();
  };

  return (
    <div className="relative flex items-center">

      {/* PROFILE CARD */}
      <div
        className="
          flex
          items-center
          gap-3
          bg-white
          border
          border-gray-200
          rounded-full
          px-3
          py-1.5
          shadow-md
        "
      >

        {/* PROFILE IMAGE */}
        <img
          src={
            user.profileImageUrl ||
            "/default-avatar.png"
          }
          alt="Profile"
          className="
            w-11
            h-11
            rounded-full
            object-cover
            border-2
            border-pink-500
          "
        />

        {/* USER INFO */}
        <div className="hidden md:block">
          <h2 className="text-black text-sm font-semibold">
            {user.name ||
              user.fullName}
          </h2>

          <p className="text-zinc-600 text-xs">
            Welcome Back
          </p>
        </div>

        {/* SETTINGS BUTTON */}
        <button
          onClick={() =>
            setOpen(!open)
          }
          className="
            w-9
            h-9
            rounded-full
            bg-gray-100
            hover:bg-gray-200
            flex
            items-center
            justify-center
            text-black
            transition
          "
        >
          <Settings size={18} />
        </button>
      </div>

      {/* DROPDOWN */}
      {open && (
        <div
          className="
            absolute
            right-0
            top-16
            w-72
            bg-[#0f172a]
            border
            border-white/10
            rounded-3xl
            p-4
            shadow-2xl
            z-50
          "
        >

          <h2 className="text-white text-xl font-bold mb-4">
            Profile Settings
          </h2>

          {/* CHANGE PHOTO */}
          <label
            className="
              w-full
              flex
              items-center
              px-4 py-3
              rounded-xl
              bg-white/5
              hover:bg-white/10
              text-white
              mb-3
              cursor-pointer
              transition
            "
          >
            Change Photo

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={
                handlePhotoUpload
              }
            />
          </label>

          {/* CHANGE USERNAME */}
          <button
            onClick={() => {
              setFieldType(
                "username"
              );

              setInputValue(
                user.name || ""
              );

              setShowModal(true);
            }}
            className="
              w-full
              text-left
              px-4 py-3
              rounded-xl
              bg-white/5
              hover:bg-white/10
              text-white
              mb-3
              transition
            "
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
            }}
            className="
              w-full
              text-left
              px-4 py-3
              rounded-xl
              bg-white/5
              hover:bg-white/10
              text-white
              mb-3
              transition
            "
          >
            Change Email
          </button>

          {/* SIGN OUT */}
          <button
            onClick={handleLogout}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-2
              px-4 py-3
              rounded-xl
              bg-red-500/20
              hover:bg-red-500/30
              text-red-400
              transition
            "
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div
          className="
            fixed
            inset-0
            bg-black/70
            backdrop-blur-sm
            flex
            items-center
            justify-center
            z-[100]
          "
        >

          <div
            className="
              w-[90%]
              max-w-md
              bg-[#111827]
              border
              border-white/10
              rounded-3xl
              p-6
              shadow-2xl
            "
          >

            {/* TITLE */}
            <h2 className="text-2xl font-bold text-white mb-5">
              {fieldType ===
              "username"
                ? "Change Username"
                : "Change Email"}
            </h2>

            {/* INPUT */}
            <input
              type="text"
              value={inputValue}
              onChange={(e) =>
                setInputValue(
                  e.target.value
                )
              }
              className="
                w-full
                bg-white/5
                border
                border-white/10
                rounded-xl
                px-4 py-3
                text-white
                outline-none
                mb-5
              "
              placeholder={
                fieldType ===
                "username"
                  ? "Enter username"
                  : "Enter email"
              }
            />

            {/* BUTTONS */}
            <div className="flex justify-end gap-3">

              {/* CANCEL */}
              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="
                  px-5 py-2
                  rounded-xl
                  bg-white/10
                  text-white
                  hover:bg-white/20
                "
              >
                Cancel
              </button>

              {/* SAVE */}
              <button
                onClick={handleSave}
                className="
                  px-5 py-2
                  rounded-xl
                  bg-gradient-to-r
                  from-pink-500
                  to-purple-500
                  text-white
                  font-semibold
                "
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