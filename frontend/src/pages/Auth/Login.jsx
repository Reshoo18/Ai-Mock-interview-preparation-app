// import { API_PATHS } from '../../utils/apiPaths';

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Input from '../../component/Inputs/input';
// import { validateEmail } from '../../utils/helper';
// import axiosInstance from '../../utils/axiosinstance';
// import { useContext } from 'react';
// import { UserContext } from '../../context/userContext';

// const Login = ({setCurrentPage}) => {
//   const [email, setemail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

//   const {updateUser}=useContext(UserContext)

//   const navigate = useNavigate();

//   //Handle Login From Submit
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!validateEmail(email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }

//     if (!password) {
//       setError("Please enter a the password");
//       return;
//     }

//     setError("");

//     //Login API Call
//     try {
//       const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
//         email,password,
        
//       });
//       const {token}=response.data;
//       if(token){
//         localStorage.setItem('token',token);
//         updateUser(response.data)
//         navigate("/dashboard")
//       }
//     } catch (error) {
//       if(error.response && error.response.data.message) {
//         setError(error.response.data.message);
//       } else {
//         setError("Something went wrong. Please try again.");
//       }
//     }
//   };
  
  
//   return  <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
//       <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
//       <p className="text-xs text-slate-700 mt-[5px] mb-6">
//         Please enter your details to log in
//       </p>

//       <form onSubmit={handleLogin}>
//         <Input
//           value={email}     
//           onChange={({ target }) => setemail(target.value)}
//           label="Email Address"
//           placeholder="john@example.com"
//           type="text"
//         />

//         <Input
//           value={password}
//           onChange={({ target }) => setPassword(target.value)}
//           label="Password"
//           placeholder="Min. 8 characters"
//           type="password"
//         /> 


//         {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

//         <button type="submit" className="btn-primary">
//           LOGIN
//         </button>

//         <p className="text-[13px] text-slate-800 mt-3">
//           Don't have an account?{" "}
//           <button
//             className="font-medium text-primary underline cursor-pointer"
//             onClick={() => {
//               setCurrentPage("signup");
//             }}
//           >
//             SignUp
//           </button>  
//         </p>
//       </form>  
//     </div>
    
// };

// export default Login;

import { API_PATHS } from "../../utils/apiPaths";

import React, {
  useState,
  useContext,
} from "react";

import { useNavigate } from "react-router-dom";

import Input from "../../component/Inputs/Input";

import { validateEmail } from "../../utils/helper";

import axiosInstance from "../../utils/axiosinstance";

import { UserContext } from "../../context/userContext";

const Login = ({ setCurrentPage }) => {

  const [email, setemail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState(null);

  // FORGOT PASSWORD
  const [showForgot, setShowForgot] =
    useState(false);

  const [resetEmail, setResetEmail] =
    useState("");

  const { updateUser } =
    useContext(UserContext);

  const navigate = useNavigate();

  // LOGIN
  const handleLogin = async (e) => {

    e.preventDefault();

    if (!validateEmail(email)) {

      setError(
        "Please enter a valid email address."
      );

      return;
    }

    if (!password) {

      setError(
        "Please enter the password"
      );

      return;
    }

    setError("");

    try {

      const response =
        await axiosInstance.post(
          API_PATHS.AUTH.LOGIN,
          {
            email,
            password,
          }
        );

      const { token } =
        response.data;

      if (token) {

        localStorage.setItem(
          "token",
          token
        );

        updateUser(
          response.data
        );

        navigate("/dashboard");
      }

    } catch (error) {

      if (
        error.response &&
        error.response.data.message
      ) {

        setError(
          error.response.data.message
        );

      } else {

        setError(
          "Something went wrong. Please try again."
        );
      }
    }
  };

  // RESET PASSWORD
  const handleResetPassword = () => {

    if (!resetEmail) {
      return;
    }

    alert(
      `Reset link sent to ${resetEmail}`
    );

    setShowForgot(false);

    setResetEmail("");
  };

  return (

    <>
      <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">

        <h3 className="text-2xl font-bold text-black">
          Welcome Back
        </h3>

        <p className="text-sm text-slate-600 mt-[5px] mb-6">
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>

          {/* EMAIL */}
          <Input
            value={email}
            onChange={({ target }) =>
              setemail(target.value)
            }
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          {/* PASSWORD */}
          <Input
            value={password}
            onChange={({ target }) =>
              setPassword(target.value)
            }
            label="Password"
            placeholder="Min. 8 characters"
            type="password"
          />

          {/* FORGOT PASSWORD */}
          <div className="flex justify-end mb-3">

            <button
              type="button"
              onClick={() =>
                setShowForgot(true)
              }
              className="text-sm text-purple-500 hover:text-pink-500 transition"
            >
              Forgot Password?
            </button>

          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-xs pb-2.5">
              {error}
            </p>
          )}

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="btn-primary"
          >
            LOGIN
          </button>

          {/* SIGNUP */}
          <p className="text-[13px] text-slate-800 mt-3">

            Don't have an account?{" "}

            <button
              type="button"
              className="font-medium text-primary underline cursor-pointer"
              onClick={() => {
                setCurrentPage(
                  "signup"
                );
              }}
            >
              SignUp
            </button>

          </p>
        </form>
      </div>

      {/* FORGOT PASSWORD MODAL */}
      {showForgot && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">

          <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">

            <h2 className="text-2xl font-bold text-black">
              Reset Password
            </h2>

            <p className="text-sm text-slate-600 mt-2">
              Enter your email to receive reset link.
            </p>

            <div className="mt-5">

              <Input
                value={resetEmail}
                onChange={({ target }) =>
                  setResetEmail(
                    target.value
                  )
                }
                label="Email Address"
                placeholder="john@example.com"
                type="text"
              />

            </div>

            <button
              onClick={
                handleResetPassword
              }
              className="btn-primary w-full mt-4"
            >
              Send Reset Link
            </button>

            <button
              type="button"
              onClick={() =>
                setShowForgot(false)
              }
              className="w-full mt-3 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
            >
              Cancel
            </button>

          </div>
        </div>
      )}
    </>
  );
};

export default Login;