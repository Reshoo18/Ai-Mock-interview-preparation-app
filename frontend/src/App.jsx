// import React from 'react'
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Toaster} from "react-hot-toast";

// import Dashboard from "./pages/Home/Dashboard";
// import InterviewPrep from "./pages/InterviewPrep/Interviewprep";
// import LandingPage from "./pages/LandingPage";
// import UserProvider from './context/userContext';
// const App = () => {
//   return (
//     <UserProvider>
//     <div>
//       <Router>
//         <Routes>
//           {/* Default route */}
//           <Route path="/" element={<LandingPage />} />

//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/interview-prep" element={<InterviewPrep />} />
//         </Routes>
//       </Router>
//       <Toaster 
//       toastOptions={{
//         className: "",
//         style: {
//           fontSize: '13px',
//         },
//       }}
//       />
//     </div>
//     </UserProvider>
//   )
// }

// export default App

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Dashboard from "./pages/Home/Dashboard";
import InterviewPrep from "./pages/InterviewPrep/Interviewprep";
import LandingPage from "./pages/LandingPage";
import UserProvider from './context/userContext';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Default route */}
          <Route path="/" element={<LandingPage />} />

          <Route path="/dashboard" element={<Dashboard />} />

          {/* ✅ FIX HERE */}
          <Route path="/interview-prep/:id" element={<InterviewPrep />} />

          {/* Optional fallback */}
          <Route path="/interview-prep" element={<InterviewPrep />} />
        </Routes>

        <Toaster 
          toastOptions={{
            style: { fontSize: '13px' },
          }}
        />
      </Router>
    </UserProvider>
  )
}

export default App;
