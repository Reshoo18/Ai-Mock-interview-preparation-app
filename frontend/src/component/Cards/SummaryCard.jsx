
// import React from 'react'
// import { MdDelete } from "react-icons/md";
// import { LuTrash2 } from "react-icons/lu";


// const SummaryCard = ({
//   colors,
//   role,
//   experience,
//   topicsToFocus,
//   questionsCount,
//   description,
//   lastUpdated,
//   onSelect,
//   onDelete,
// }) => {
//   return (
//     <div
//       className="bg-white rounded-xl shadow-md p-4 w-full max-w-md cursor-pointer hover:shadow-lg transition"
//       onClick={onSelect}
//     >
//       {/* TOP SECTION */}
//       <div
//         className="flex justify-between items-start rounded-lg p-3"
//         style={{ background: colors }}
//       >
//         <div className="flex gap-3 items-center">
//           {/* Avatar */}
//           <div className="h-10 w-10 flex items-center justify-center rounded-md bg-white font-bold text-gray-700">
//             {role?.charAt(0)}
//           </div>

//           {/* Role + Topics */}
//           <div>
//             <h3 className="font-semibold text-gray-800">
//               {role}
//             </h3>
//             <p className="text-sm text-gray-600">
//               {topicsToFocus}
//             </p>
//           </div>
//         </div>

//         {/* Delete */}
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             onDelete && onDelete();
//           }}
//           className="text-red-500 text-xs bg-red-100 px-2 py-1 rounded hover:bg-red-200"
//         >
//           <LuTrash2 />
//         </button>
//       </div>

//       {/* INFO PILLS */}
//       <div className="flex flex-wrap gap-2 mt-3">
//         <span className="text-xs border px-2 py-1 rounded-full">
//           Experience: {experience} Years
//         </span>

//         <span className="text-xs border px-2 py-1 rounded-full">
//           {questionsCount} Q&amp;A
//         </span>

//         <span className="text-xs border px-2 py-1 rounded-full">
//           Last Updated: {lastUpdated}
//         </span>
//       </div>

//       {/* DESCRIPTION */}
//       <p className="text-sm text-gray-600 mt-3">
//         {description}
//       </p>
//     </div>
//   );
// };

// export default SummaryCard;



 import React from "react";
 import { LuTrash2 } from "react-icons/lu";
import { getInitials } from "../../utils/helper";


 const SummaryCard=({
  
      colors,
      role,
      experience,
      topicsToFocus,
      questionsCount,
      description,
      lastUpdated,
      onSelect,
      onDelete,
 })=>{
  return <div  className=" group bg-white border border-gray-300/40 rounded-xl p-2 overflow-hidden cursor-pointer hover:shadow-xl shadow-gray-100 relative " onClick={onSelect}>
         <div className="rounded-lg p-4 cursor-pointer relative" style={{
          background:colors,
         }}>
           <div className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-white rounded-md flex items-center justify-center mr-4">
              <span  className="text-lg font-semibold text-black">
               {getInitials(role)}
              </span>
            </div>

            <div className="flex-grow">
              <div className="flex justify-between items-start">




                <div>
                  <h2 className="text-[17px] font-medium">{role}</h2>
                  <p className="text-xs text-medium text-gray-900">{topicsToFocus}</p>
                </div>
              </div>
            </div>
           </div>
           <button className="hidden group-hover:flex items-center gap-2 text-xs text-rose-500 font-medium bg-rose-50 px-3 py-1 rounded text-nowrap border border-rose-100 hover:border-rose-200 cursor-pointer absolute top-0 right-0" onClick={(e)=>{
            e.stopPropagation();
            onDelete();
           }}>
            <LuTrash2/>

           </button>
        </div>

        <div className="px-3 pb-3">
          <div className="flex items-center gap-3 mt-4">
            <div className="text-[13px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full ">
                  Experience : {experience} {experience == 1 ? "Year" : "Years"}
            </div>

             <div className="text-[13px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full">
              {questionsCount} Q&A
             </div>
                
                <div className="text-[13px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full">
                  Last Updated: {lastUpdated}
                </div>

          </div>
                
                <p className="text-[15px] text-gray-500 line-clamp-2 mt-3">{description}</p>
        </div>
  </div>
 }

 export default SummaryCard