// // import React from 'react'
// // import ProfileInfoCard from '../Cards/ProfileInfoCard';
// // import { Link } from 'react-router-dom';
// // const Navbar = () => {
// //   return (
// //     <div className='h-16 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-2.5 px-4 md:px-0 sticky top-0 z-30'>
// //       <div className='container mx-auto flex items-center justify-between gap-5'>
// //          <Link to="/dashboard">
// //          <h2 className='text-lg md:text-xl font-medium text-black leading-5'>
// //           Interview Prep AI
// //          </h2>
// //          </Link>

// //          <ProfileInfoCard/>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Navbar
// import React from "react";
// import ProfileInfoCard from "../Cards/ProfileInfoCard";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <div className="h-16 sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-black/80 border-b border-white/10 shadow-lg">

//       <div className="container mx-auto flex items-center justify-between px-4 h-full">

//         {/* 🔥 Logo */}
//         <Link to="/dashboard">
//           <h2 className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent tracking-wide">
//             Interview Prep AI
//           </h2>
//         </Link>

//         {/* 👤 Profile */}
//         <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full shadow-inner border border-white/10">
//           <ProfileInfoCard />
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Navbar;
import React from "react";
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-16 sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-black border-b border-white/10 shadow-lg">

      <div className="container mx-auto flex items-center justify-between px-4 h-full">

        {/* Logo */}
        <Link to="/dashboard">
          <h2 className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent">
            Interview Prep AI
          </h2>
        </Link>

        {/* Profile */}
        <ProfileInfoCard />

      </div>
    </div>
  );
};

export default Navbar;