


// import { useState } from "react";
// import axios from "axios";

// import {
//   FileText,
//   Sparkles,
//   AlertTriangle,
//   CheckCircle2,
//   UploadCloud,
//   X,
// } from "lucide-react";

// const ATSChecker = () => {
//   const [file, setFile] = useState(null);

//   const [loading, setLoading] =
//     useState(false);

//   const [result, setResult] =
//     useState(null);

//   const handleUpload = async () => {
//     try {
//       if (!file) return;

//       setLoading(true);

//       // clear previous result
//       setResult(null);

//       const formData = new FormData();

//       formData.append("resume", file);

//       const response = await axios.post(
//         "http://localhost:8000/api/ats/check-ats",
//         formData
//       );

//       // premium fake loading
//       setTimeout(() => {
//         setResult(response.data.data);
//         setLoading(false);
//       }, 10000);

//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white overflow-hidden relative px-6 py-10 md:px-14">

//       {/* BACKGROUND GLOW */}
//       <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full" />

//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 blur-[120px] rounded-full" />

//       {/* HEADER */}
//       <div className="relative z-10 mb-14">

//         <div className="flex items-center gap-4 mb-4">

//           <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-2xl shadow-lg shadow-pink-500/30">
//             <Sparkles size={28} />
//           </div>

//           <div>
//             <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-purple-300 to-pink-400 bg-clip-text text-transparent">
//               ATS Resume Checker
//             </h1>

//             <p className="text-zinc-400 mt-2 text-lg">
//               Analyze your resume with AI
//               and improve ATS performance.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* UPLOAD SECTION */}
//       <div className="relative z-10 max-w-5xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl shadow-purple-900/20">

//         <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">

//           {/* FILE AREA */}
//           <div className="w-full">

//             <input
//               type="file"
//               accept=".pdf,.docx"
//               id="resumeUpload"
//               hidden
//               onChange={(e) =>
//                 setFile(e.target.files[0])
//               }
//             />

//             <label
//               htmlFor="resumeUpload"
//               className="group border-2 border-dashed border-purple-500/40 hover:border-pink-500 transition-all duration-300 rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer bg-gradient-to-br from-purple-500/5 to-pink-500/5"
//             >
//               <UploadCloud
//                 size={55}
//                 className="text-purple-400 mb-4 group-hover:scale-110 transition-all"
//               />

//               <h2 className="text-2xl font-bold mb-2">
//                 Upload Resume
//               </h2>

//               <p className="text-zinc-400 text-center">
//                 Upload PDF or DOCX resume
//                 for ATS analysis
//               </p>

//               <div className="mt-5 bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-xl font-semibold shadow-lg shadow-pink-500/20">
//                 Choose File
//               </div>
//             </label>
//           </div>

//           {/* FILE INFO */}
//           <div className="w-full lg:w-[420px]">

//             <div className="bg-black/40 border border-white/10 rounded-3xl p-6">

//               <div className="flex items-center justify-between mb-5">

//                 <h2 className="text-xl font-bold flex items-center gap-2">
//                   <FileText className="text-purple-400" />
//                   Selected Resume
//                 </h2>

//                 {file && (
//                   <button
//                     onClick={() => {
//                       setFile(null);
//                       setResult(null);
//                     }}
//                     className="bg-red-500/20 hover:bg-red-500 px-3 py-2 rounded-xl transition-all"
//                   >
//                     <X size={18} />
//                   </button>
//                 )}
//               </div>

//               <div className="bg-white/5 rounded-2xl p-4 min-h-[100px] flex items-center justify-center text-center border border-white/5">

//                 {file ? (
//                   <div>

//                     <p className="text-lg font-semibold break-all text-purple-300">
//                       {file.name}
//                     </p>

//                     <p className="text-zinc-400 mt-2 text-sm">
//                       Ready for ATS analysis
//                     </p>
//                   </div>
//                 ) : (
//                   <p className="text-zinc-500">
//                     No file selected
//                   </p>
//                 )}
//               </div>

//               {/* BUTTON */}
//               <button
//                 onClick={handleUpload}
//                 disabled={!file || loading}
//                 className="mt-6 w-full bg-gradient-to-r from-purple-500 to-pink-500 py-4 rounded-2xl text-lg font-bold hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 shadow-xl shadow-pink-500/20"
//               >
//                 {loading ? (
//                   <div className="flex items-center justify-center gap-3">

//                     {/* SPINNER */}
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />

//                     AI is analyzing...
//                   </div>
//                 ) : (
//                   "Check ATS Score"
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* RESULT */}
//       {result && (
//         <div className="relative z-10 mt-14 max-w-7xl">

//           {/* SCORE CARD */}
//           <div className="bg-gradient-to-r from-purple-600/20 to-pink-500/20 border border-white/10 rounded-3xl p-8 mb-8 backdrop-blur-xl shadow-2xl shadow-purple-900/20">

//             <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

//               <div>

//                 <p className="text-zinc-400 text-lg mb-2">
//                   Resume ATS Performance
//                 </p>

//                 <h2 className="text-6xl font-black mb-4 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
//                   {result.score}/100
//                 </h2>

//                 {/* PROGRESS BAR */}
//                 <div className="w-[300px] bg-zinc-800 h-5 rounded-full overflow-hidden">

//                   <div
//                     className={`h-full rounded-full transition-all duration-1000 ${
//                       result.score >= 80
//                         ? "bg-green-500"
//                         : result.score >= 60
//                         ? "bg-yellow-500"
//                         : "bg-red-500"
//                     }`}
//                     style={{
//                       width: `${result.score}%`,
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* SCORE CIRCLE */}
//               <div className="bg-black/40 rounded-full w-52 h-52 flex items-center justify-center border-[10px] border-purple-500 shadow-2xl shadow-purple-500/20">

//                 <div className="text-center">

//                   <h1 className="text-5xl font-black text-purple-300">
//                     {result.score}%
//                   </h1>

//                   <p className="text-zinc-400 mt-2">
//                     ATS Match
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* GRID */}
//           <div className="grid lg:grid-cols-2 gap-8">

//             {/* MISSING SKILLS */}
//             <div className="bg-white/5 border border-white/10 rounded-3xl p-7 backdrop-blur-xl">

//               <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-pink-400">

//                 <AlertTriangle />

//                 Missing Skills
//               </h2>

//               <div className="flex flex-wrap gap-3">

//                 {result.missingSkills?.map(
//                   (skill, index) => (
//                     <div
//                       key={index}
//                       className="bg-pink-500/20 border border-pink-500/30 px-4 py-2 rounded-xl"
//                     >
//                       {skill}
//                     </div>
//                   )
//                 )}
//               </div>
//             </div>

//             {/* IMPROVEMENTS */}
//             <div className="bg-white/5 border border-white/10 rounded-3xl p-7 backdrop-blur-xl">

//               <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-green-400">

//                 <CheckCircle2 />

//                 Improvements
//               </h2>

//               <div className="space-y-4">

//                 {result.improvements?.map(
//                   (item, index) => (
//                     <div
//                       key={index}
//                       className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4"
//                     >
//                       • {item}
//                     </div>
//                   )
//                 )}
//               </div>
//             </div>

//             {/* WEAK SECTIONS */}
//             <div className="bg-white/5 border border-white/10 rounded-3xl p-7 backdrop-blur-xl">

//               <h2 className="text-2xl font-bold mb-6 text-yellow-400">
//                 Weak Sections
//               </h2>

//               <div className="space-y-4">

//                 {result.weakSections?.map(
//                   (item, index) => (
//                     <div
//                       key={index}
//                       className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4"
//                     >
//                       • {item}
//                     </div>
//                   )
//                 )}
//               </div>
//             </div>

//             {/* FORMATTING */}
//             <div className="bg-white/5 border border-white/10 rounded-3xl p-7 backdrop-blur-xl">

//               <h2 className="text-2xl font-bold mb-6 text-red-400">
//                 Formatting Issues
//               </h2>

//               <div className="space-y-4">

//                 {result.formattingIssues?.map(
//                   (item, index) => (
//                     <div
//                       key={index}
//                       className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4"
//                     >
//                       • {item}
//                     </div>
//                   )
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* SUMMARY */}
//           <div className="mt-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-8 backdrop-blur-xl">

//             <h2 className="text-3xl font-bold mb-5 text-cyan-300">
//               AI Resume Summary
//             </h2>

//             <p className="text-zinc-300 text-lg leading-9">
//               {result.summary}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ATSChecker;




import { useState } from "react";
import axios from "axios";

import {
  FileText,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  UploadCloud,
  X,
} from "lucide-react";

const ATSChecker = () => {
  const [file, setFile] = useState(null);

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const [resumePreview, setResumePreview] =
    useState(null);

  const handleUpload = async () => {
    try {
      if (!file) return;

      setLoading(true);

      // clear old result
      setResult(null);

      // resume preview
      setResumePreview(
        URL.createObjectURL(file)
      );

      const formData = new FormData();

      formData.append("resume", file);

      const response = await axios.post(
        "http://localhost:8000/api/ats/check-ats",
        formData
      );

      // premium fake loading
      setTimeout(() => {
        setResult(response.data.data);
        setLoading(false);
      }, 10000);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative px-6 py-10 md:px-14">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 blur-[120px] rounded-full" />

      {/* HEADER */}
      <div className="relative z-10 mb-14 flex flex-col lg:flex-row items-start justify-between gap-8">

        {/* LEFT */}
        <div>

          <div className="flex items-center gap-4 mb-4">

            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-2xl shadow-lg shadow-pink-500/30">
              <Sparkles size={28} />
            </div>

            <div>
              <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-purple-300 to-pink-400 bg-clip-text text-transparent">
                ATS Resume Checker
              </h1>

              <p className="text-zinc-400 mt-2 text-lg">
                Analyze your resume with AI
                and improve ATS performance.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT RESUME CARD */}
        <div className="w-full lg:w-[360px]">

          <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-5 shadow-2xl shadow-purple-500/10">

            <div className="flex items-center justify-between mb-4">

              <div className="flex items-center gap-3">

                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-2xl">
                  <FileText size={22} />
                </div>

                <div>
                  <h3 className="font-bold text-lg">
                    Resume Status
                  </h3>

                  <p className="text-zinc-400 text-sm">
                    AI Resume Tracking
                  </p>
                </div>
              </div>

              {/* LIVE DOT */}
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            </div>

            {/* FILE INFO */}
            <div className="bg-black/30 border border-white/5 rounded-2xl p-4">

              {file ? (
                <div>

                  <p className="text-purple-300 font-semibold break-all">
                    {file.name}
                  </p>

                  <div className="flex items-center justify-between mt-4">

                    <span className="text-green-400 text-sm">
                      Resume Uploaded
                    </span>

                    <span className="text-zinc-500 text-sm">
                      Ready for ATS
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-3">

                  <p className="text-zinc-500">
                    No resume uploaded yet
                  </p>
                </div>
              )}
            </div>

            {/* MINI STATS */}
            <div className="grid grid-cols-2 gap-4 mt-5">

              <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-4 text-center">

                <h2 className="text-2xl font-black text-purple-300">
                  {result ? result.score : "--"}
                </h2>

                <p className="text-zinc-400 text-sm">
                  ATS Score
                </p>
              </div>

              <div className="bg-pink-500/10 border border-pink-500/20 rounded-2xl p-4 text-center">

                <h2 className="text-2xl font-black text-pink-300">
                  {result
                    ? result.missingSkills?.length
                    : "--"}
                </h2>

                <p className="text-zinc-400 text-sm">
                  Missing Skills
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* UPLOAD SECTION */}
      <div className="relative z-10 max-w-5xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl shadow-purple-900/20">

        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">

          {/* FILE AREA */}
          <div className="w-full">

            <input
              type="file"
              accept=".pdf,.docx"
              id="resumeUpload"
              hidden
              onChange={(e) =>
                setFile(e.target.files[0])
              }
            />

            <label
              htmlFor="resumeUpload"
              className="group border-2 border-dashed border-purple-500/40 hover:border-pink-500 transition-all duration-300 rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer bg-gradient-to-br from-purple-500/5 to-pink-500/5"
            >
              <UploadCloud
                size={55}
                className="text-purple-400 mb-4 group-hover:scale-110 transition-all"
              />

              <h2 className="text-2xl font-bold mb-2">
                Upload Resume
              </h2>

              <p className="text-zinc-400 text-center">
                Upload PDF or DOCX resume
                for ATS analysis
              </p>

              <div className="mt-5 bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-xl font-semibold shadow-lg shadow-pink-500/20">
                Choose File
              </div>
            </label>
          </div>

          {/* FILE INFO */}
          <div className="w-full lg:w-[420px]">

            <div className="bg-black/40 border border-white/10 rounded-3xl p-6">

              <div className="flex items-center justify-between mb-5">

                <h2 className="text-xl font-bold flex items-center gap-2">
                  <FileText className="text-purple-400" />
                  Selected Resume
                </h2>

                {file && (
                  <button
                    onClick={() => {
                      setFile(null);
                      setResult(null);
                      setResumePreview(null);
                    }}
                    className="bg-red-500/20 hover:bg-red-500 px-3 py-2 rounded-xl transition-all"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              <div className="bg-white/5 rounded-2xl p-4 min-h-[100px] flex items-center justify-center text-center border border-white/5">

                {file ? (
                  <div>

                    <p className="text-lg font-semibold break-all text-purple-300">
                      {file.name}
                    </p>

                    <p className="text-zinc-400 mt-2 text-sm">
                      Ready for ATS analysis
                    </p>
                  </div>
                ) : (
                  <p className="text-zinc-500">
                    No file selected
                  </p>
                )}
              </div>

              {/* BUTTON */}
              <button
                onClick={handleUpload}
                disabled={!file || loading}
                className="mt-6 w-full bg-gradient-to-r from-purple-500 to-pink-500 py-4 rounded-2xl text-lg font-bold hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 shadow-xl shadow-pink-500/20"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">

                    {/* SPINNER */}
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />

                    AI is analyzing...
                  </div>
                ) : (
                  "Check ATS Score"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RESULT */}
      {result && (
        <div className="relative z-10 mt-14 max-w-7xl">

          {/* SCORE CARD */}
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-500/20 border border-white/10 rounded-3xl p-8 mb-8 backdrop-blur-xl shadow-2xl shadow-purple-900/20">

            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

              <div>

                <p className="text-zinc-400 text-lg mb-2">
                  Resume ATS Performance
                </p>

                <h2 className="text-6xl font-black mb-4 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                  {result.score}/100
                </h2>

                {/* PROGRESS BAR */}
                <div className="w-[300px] bg-zinc-800 h-5 rounded-full overflow-hidden">

                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      result.score >= 80
                        ? "bg-green-500"
                        : result.score >= 60
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{
                      width: `${result.score}%`,
                    }}
                  />
                </div>
              </div>

              {/* SCORE CIRCLE */}
              <div className="bg-black/40 rounded-full w-52 h-52 flex items-center justify-center border-[10px] border-purple-500 shadow-2xl shadow-purple-500/20">

                <div className="text-center">

                  <h1 className="text-5xl font-black text-purple-300">
                    {result.score}%
                  </h1>

                  <p className="text-zinc-400 mt-2">
                    ATS Match
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* GRID */}
          <div className="grid lg:grid-cols-2 gap-8">

            {/* MISSING SKILLS */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-7 backdrop-blur-xl">

              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-pink-400">

                <AlertTriangle />

                Missing Skills
              </h2>

              <div className="flex flex-wrap gap-3">

                {result.missingSkills?.map(
                  (skill, index) => (
                    <div
                      key={index}
                      className="bg-pink-500/20 border border-pink-500/30 px-4 py-2 rounded-xl"
                    >
                      {skill}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* IMPROVEMENTS */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-7 backdrop-blur-xl">

              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-green-400">

                <CheckCircle2 />

                Improvements
              </h2>

              <div className="space-y-4">

                {result.improvements?.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4"
                    >
                      • {item}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* WEAK SECTIONS */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-7 backdrop-blur-xl">

              <h2 className="text-2xl font-bold mb-6 text-yellow-400">
                Weak Sections
              </h2>

              <div className="space-y-4">

                {result.weakSections?.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4"
                    >
                      • {item}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* FORMATTING */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-7 backdrop-blur-xl">

              <h2 className="text-2xl font-bold mb-6 text-red-400">
                Formatting Issues
              </h2>

              <div className="space-y-4">

                {result.formattingIssues?.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4"
                    >
                      • {item}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="mt-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-8 backdrop-blur-xl">

            <h2 className="text-3xl font-bold mb-5 text-cyan-300">
              AI Resume Summary
            </h2>

            <p className="text-zinc-300 text-lg leading-9">
              {result.summary}
            </p>
          </div>

          {/* RESUME PREVIEW */}
          {resumePreview && (
            <div className="mt-10 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">

              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Resume Preview
              </h2>

              <div className="overflow-hidden rounded-3xl border border-white/10">

                <iframe
                  src={resumePreview}
                  title="Resume Preview"
                  className="w-full h-[900px] bg-white"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ATSChecker;