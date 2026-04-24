// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../../context/userContext";

// const ProfileInfoCard = () => {
//   const { user, clearUser } = useContext(UserContext);
//   const navigate = useNavigate();

//    if (!user) {
//      return null; // or a skeleton / loader
//   }
//   const handleLogout = () => {
//     localStorage.clear();
//     clearUser();
//     navigate("/");
//   };

//   return (
//     <div className="flex items-center">
//       <img
//         src={user.profileImageUrl || "/default-avatar.png"}
//         alt="Profile"
//         className="w-11 h-11 bg-gray-300 rounded-full mr-3"
//       />
//       <div>
//         <div className="text-[15px] text-black font-bold leading-3">
//           {user.name || user.fullName}
//         </div>
//         <button
//           className="text-amber-600 text-sm font-semibold cursor-pointer hover:underline"
//           onClick={handleLogout}
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

//  export default ProfileInfoCard;

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  return (
    <div className="flex items-center gap-3 bg-white text-gray-900 px-3 py-1.5 rounded-full shadow-md border border-gray-200 hover:shadow-lg transition">

      {/* Avatar */}
      <img
        src={user.profileImageUrl || "/default-avatar.png"}
        alt="Profile"
        className="w-10 h-10 rounded-full object-cover border"
      />

      {/* Name + Logout */}
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-semibold">
          {user.name || user.fullName}
        </span>

        <button
          onClick={handleLogout}
          className="text-xs text-pink-500 hover:text-pink-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoCard;