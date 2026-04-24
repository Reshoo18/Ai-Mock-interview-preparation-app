

import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { getInitials } from "../../utils/helper";

const gradients = [
  "linear-gradient(135deg, #667eea, #764ba2)", // purple-blue
  "linear-gradient(135deg, #ff7e5f, #feb47b)", // orange
  "linear-gradient(135deg, #43cea2, #185a9d)", // green-blue
  "linear-gradient(135deg, #f7971e, #ffd200)", // yellow
  "linear-gradient(135deg, #ff4e50, #f9d423)", // red-yellow
  "linear-gradient(135deg, #00c6ff, #0072ff)", // blue
];

const SummaryCard = ({
  index,
  colors,
  role,
  experience,
  topicsToFocus,
  questionsCount,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  const safeRole = role || topicsToFocus || "Untitled";

  return (
    <div
      className="group rounded-2xl p-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-[1.03] transition-all duration-300 cursor-pointer"
      onClick={onSelect}
    >
      {/* Glass Card */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 shadow-lg hover:shadow-2xl hover:shadow-purple-200 relative">

        {/* TOP SECTION */}
        <div
          className="rounded-xl p-4 text-white"
          // style={{
          //   background: "linear-gradient(135deg, #667eea, #764ba2)",
          // }}
          style={{
  background: gradients[index % gradients.length],
}}
        >
          <div className="flex items-start">

            {/* Initials */}
            <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-white/20 backdrop-blur-md text-white font-bold text-lg shadow-inner mr-4">
              {getInitials(safeRole)}
            </div>

            {/* Role Info */}
            <div className="flex-grow">
              <h2 className="text-lg font-semibold">{safeRole}</h2>
              <p className="text-sm opacity-90">{topicsToFocus}</p>
            </div>
          </div>

          {/* Delete Button */}
          <button
            className="hidden group-hover:flex items-center gap-2 text-xs text-red-500 font-medium bg-white px-3 py-1 rounded-full shadow-md hover:bg-red-50 absolute top-3 right-3"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <LuTrash2 />
          </button>
        </div>

        {/* INFO PILLS */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="px-3 py-1 text-xs bg-white/70 backdrop-blur-md rounded-full shadow-sm border border-white/40">
            Experience: {experience} {experience === 1 ? "Year" : "Years"}
          </span>

          <span className="px-3 py-1 text-xs bg-white/70 backdrop-blur-md rounded-full shadow-sm border border-white/40">
            {questionsCount} Q&A
          </span>

          <span className="px-3 py-1 text-xs bg-white/70 backdrop-blur-md rounded-full shadow-sm border border-white/40">
            {lastUpdated}
          </span>
        </div>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-600 mt-3 line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;