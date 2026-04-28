// // import React from "react";
// // import ProfileInfoCard from "../Cards/ProfileInfoCard";
// // import { Link, useNavigate } from "react-router-dom";

// // const Navbar = () => {
// //   const navigate = useNavigate(); // 🔥 REQUIRED

// //   return (
// //     <div className="h-16 sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-black border-b border-white/10 shadow-lg">

// //       <div className="container mx-auto flex items-center justify-between px-4 h-full">

// //         {/* Logo */}
// //         <Link to="/dashboard">
// //           <h2 className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent">
// //             Interview Prep AI
// //           </h2>
// //         </Link>

// //         {/* RIGHT SIDE */}
// //         <div className="flex items-center gap-4">

// //           {/* 🎥 MEETING BUTTON */}
// //           <button
// //             onClick={() => navigate("/meeting")}
// //             className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-md hover:scale-105 transition"
// //           >
// //             🎥 Meeting
// //           </button>

// //           {/* Profile */}
// //           <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
// //             <ProfileInfoCard />
// //           </div>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Navbar;


// import React from "react";
// import ProfileInfoCard from "../Cards/ProfileInfoCard";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="h-16 sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-black border-b border-white/10 shadow-lg">
      
//       <div className="container mx-auto flex items-center justify-between px-4 h-full">

//         {/* 🔹 LOGO */}
//         <Link to="/dashboard">
//           <h2 className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent">
//             Interview Prep AI
//           </h2>
//         </Link>

//         {/* 🔹 RIGHT SIDE */}
//         <div className="flex items-center gap-4">

//           {/* 🎤 TAKE INTERVIEW */}
//           <button
//             onClick={() => navigate("/dashboard")}
//             className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full shadow-md hover:scale-105 transition"
//           >
//             🎤 Take Interview
//           </button>

//           {/* 🎥 MEETING */}
//           <button
//             onClick={() => navigate("/meeting")}
//             className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-md hover:scale-105 transition"
//           >
//             🎥 Meeting
//           </button>

//           {/* 👤 PROFILE */}
//           <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
//             <ProfileInfoCard />
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React from "react";
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleTakeInterview = () => {
    const sessionId = localStorage.getItem("sessionId");

    if (!sessionId) {
      alert("⚠️ Please select a session first");
      return;
    }

    navigate("/interview/setup")
  };

  return (
    <div className="h-16 sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-black border-b border-white/10 shadow-lg">
      
      <div className="container mx-auto flex items-center justify-between px-4 h-full">

        {/* LOGO */}
        <Link to="/dashboard">
          <h2 className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent">
            Interview Prep AI
          </h2>
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* 🎤 TAKE INTERVIEW */}
          <button
            onClick={handleTakeInterview}
            className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full shadow-md hover:scale-105 transition"
          >
            🎤 Take Interview
          </button>

          {/* 🎥 MEETING */}
          <button
            onClick={() => navigate("/meeting")}
            className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-md hover:scale-105 transition"
          >
            🎥 Meeting
          </button>

          {/* PROFILE */}
          <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            <ProfileInfoCard />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;