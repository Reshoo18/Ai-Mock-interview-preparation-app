

// // import { useState, useContext } from "react";
// // import { useNavigate } from "react-router-dom";
// // import Input from "../../Component/Inputs/Input.jsx";
// // import ProfilePhotoSelector from "../../component/Inputs/ProfilePhotoSelector";
// // import { validateEmail } from "../../utils/helper";
// // import { UserContext } from "../../context/userContext";
// // import axiosInstance from "../../utils/axiosinstance";
// // import { API_PATHS } from "../../utils/apiPaths";

// // const SignUp = ({ setCurrentPage }) => {
// //   const { updateUser } = useContext(UserContext);
// //   const navigate = useNavigate();

// //   const [profilePic, setProfilePic] = useState(null);
// //   const [fullName, setFullName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");

// //   // 🔹 upload image helper
// //   const uploadImage = async (imageFile) => {
// //     const formData = new FormData();
// //     formData.append("image", imageFile);

// //     const res = await axiosInstance.post(
// //       API_PATHS.IMAGE.UPLOAD_IMAGE,
// //       formData,
// //       { headers: { "Content-Type": "multipart/form-data" } }
// //     );

// //     return res.data;
// //   };

// //   const handleSignUP = async () => {
// //     if (!fullName.trim()) {
// //       setError("Please enter full name.");
// //       return;
// //     }

// //     if (!validateEmail(email)) {
// //       setError("Please enter a valid email address.");
// //       return;
// //     }

// //     if (!password) {
// //       setError("Please enter the password.");
// //       return;
// //     }

// //     setError("");

// //     try {
// //       let profileImageUrl = "";

// //       if (profilePic) {
// //         const imgUploadRes = await uploadImage(profilePic);
// //         profileImageUrl = imgUploadRes.imageUrl || "";
// //       }

// //       const response = await axiosInstance.post(
// //         API_PATHS.AUTH.REGISTER,
// //         {
// //           name: fullName.trim(),
// //           email: email.toLowerCase(),
// //           password,
// //           profileImageUrl,
// //         }
// //       );

// //       // ✅ normalize response
// //       // updateUser({
// //       //   ...response.data.user,
// //       //   token: response.data.token,
// //       // });
// //       updateUser({
// //   name:
// //     response.data.user.name ||
// //     response.data.user.fullName ||
// //     fullName,
// //   email: response.data.user.email,
// //   profileImageUrl: response.data.user.profileImageUrl,
// //   token: response.data.token,
// // });

// //       navigate("/dashboard");

// //     } catch (err) {
// //       console.error("SIGNUP ERROR:", err?.response?.data);
// //       setError(
// //         err?.response?.data?.message ||
// //         "Registration failed. Please try again."
// //       );
// //     }
// //   };

  

    
// //   return (
// //     <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
// //       <h3 className="text-lg font-semibold text-black">Create an Account</h3>
// //       <p className="text-xs text-slate-700 mt-[5px] mb-6">
// //         Join us today by entering your details below.
// //       </p>

// //       <div>
// //         <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

// //         <div className="grid grid-cols-1 gap-2">
// //           <Input
// //             value={fullName}
// //             onChange={({ target }) => setFullName(target.value)}
// //             label="Full Name"
// //             placeholder="John"
// //             type="text"
// //           />

// //           <Input
// //             value={email}
// //             onChange={({ target }) => setEmail(target.value)}
// //             label="Email Address"
// //             placeholder="john@example.com"
// //             type="text"
// //           />

// //           <Input
// //             value={password}
// //             onChange={({ target }) => setPassword(target.value)}
// //             label="Password"
// //             placeholder="Min. 8 characters"
// //             type="password"
// //           />
// //         </div>

// //         {error && (
// //           <p className="text-red-500 text-xs pb-2.5 mt-2">{error}</p>
// //         )}

// //         <button
// //           type="button"
// //           className="btn-primary mt-3"
// //           onClick={handleSignUP}
// //         >
// //           SIGN UP
// //         </button>

// //         <p className="text-[13px] text-slate-800 mt-3">
// //           Already have an account?{" "}
// //           <button
// //             type="button"
// //             className="font-medium text-primary underline cursor-pointer"
// //             onClick={() => setCurrentPage("login")}
// //           >
// //             Log In
// //           </button>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SignUp;
// import { useState, useContext } from "react";

// import { useNavigate } from "react-router-dom";

// import Input from "../../component/Inputs/Input.jsx";

// import ProfilePhotoSelector from "../../component/Inputs/ProfilePhotoSelector";

// import { validateEmail } from "../../utils/helper";

// import { UserContext } from "../../context/userContext";

// import axiosInstance from "../../utils/axiosinstance";

// import { API_PATHS } from "../../utils/apiPaths";

// const SignUp = ({ setCurrentPage }) => {

//   const { updateUser } =
//     useContext(UserContext);

//   const navigate = useNavigate();

//   const [profilePic, setProfilePic] =
//     useState(null);

//   const [fullName, setFullName] =
//     useState("");

//   const [email, setEmail] =
//     useState("");

//   const [password, setPassword] =
//     useState("");

//   const [otp, setOtp] =
//     useState("");

//   const [showOtpModal, setShowOtpModal] =
//     useState(false);

//   const [isVerified, setIsVerified] =
//     useState(false);

//   const [error, setError] =
//     useState("");

//   // IMAGE UPLOAD
//   const uploadImage = async (
//     imageFile
//   ) => {

//     const formData =
//       new FormData();

//     formData.append(
//       "image",
//       imageFile
//     );

//     const res =
//       await axiosInstance.post(
//         API_PATHS.IMAGE.UPLOAD_IMAGE,
//         formData,
//         {
//           headers: {
//             "Content-Type":
//               "multipart/form-data",
//           },
//         }
//       );

//     return res.data;
//   };

//   // SEND OTP
//   const handleSendOtp =
//     async () => {

//       if (
//         !validateEmail(email)
//       ) {

//         setError(
//           "Please enter valid email"
//         );

//         return;
//       }

//       try {

//         await axiosInstance.post(
//           "/api/auth/send-otp",
//           {
//             email,
//           }
//         );

//         setShowOtpModal(true);

//         alert(
//           "OTP sent successfully"
//         );

//       } catch (err) {

//         setError(
//           "Failed to send OTP"
//         );
//       }
//     };

//   // VERIFY OTP
//   const handleVerifyOtp =
//     async () => {

//       try {

//         await axiosInstance.post(
//           "/api/auth/verify-otp",
//           {
//             email,
//             otp,
//           }
//         );

//         setIsVerified(true);

//         setShowOtpModal(false);

//         alert(
//           "Email verified successfully"
//         );

//       } catch (err) {

//         setError(
//           "Invalid OTP"
//         );
//       }
//     };

//   // SIGNUP
//   const handleSignUP =
//     async () => {

//       if (
//         !fullName.trim()
//       ) {

//         setError(
//           "Please enter full name."
//         );

//         return;
//       }

//       if (
//         !validateEmail(email)
//       ) {

//         setError(
//           "Please enter a valid email address."
//         );

//         return;
//       }

//       if (!password) {

//         setError(
//           "Please enter the password."
//         );

//         return;
//       }

//       if (!isVerified) {

//         setError(
//           "Please verify your email first."
//         );

//         return;
//       }

//       setError("");

//       try {

//         let profileImageUrl =
//           "";

//         if (profilePic) {

//           const imgUploadRes =
//             await uploadImage(
//               profilePic
//             );

//           profileImageUrl =
//             imgUploadRes.imageUrl ||
//             "";
//         }

//         const response =
//           await axiosInstance.post(
//             API_PATHS.AUTH.REGISTER,
//             {
//               name:
//                 fullName.trim(),

//               email:
//                 email.toLowerCase(),

//               password,

//               profileImageUrl,
//             }
//           );

//         updateUser({

//           name:
//             response.data.user.name ||
//             fullName,

//           email:
//             response.data.user.email,

//           profileImageUrl:
//             response.data.user
//               .profileImageUrl,

//           token:
//             response.data.token,
//         });

//         navigate(
//           "/dashboard"
//         );

//       } catch (err) {

//         console.error(
//           "SIGNUP ERROR:",
//           err?.response?.data
//         );

//         setError(
//           err?.response?.data
//             ?.message ||
//             "Registration failed. Please try again."
//         );
//       }
//     };

//   return (

//     <>
//       <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">

//         <h3 className="text-lg font-semibold text-black">
//           Create an Account
//         </h3>

//         <p className="text-xs text-slate-700 mt-[5px] mb-6">
//           Join us today by entering your details below.
//         </p>

//         <div>

//           <ProfilePhotoSelector
//             image={profilePic}
//             setImage={setProfilePic}
//           />

//           <div className="grid grid-cols-1 gap-2">

//             <Input
//               value={fullName}
//               onChange={({
//                 target,
//               }) =>
//                 setFullName(
//                   target.value
//                 )
//               }
//               label="Full Name"
//               placeholder="John"
//               type="text"
//             />

//             <Input
//               value={email}
//               onChange={({
//                 target,
//               }) =>
//                 setEmail(
//                   target.value
//                 )
//               }
//               label="Email Address"
//               placeholder="john@example.com"
//               type="text"
//             />

//             {/* SEND OTP */}
//             <button
//               type="button"
//               onClick={
//                 handleSendOtp
//               }
//               className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold mt-2"
//             >
//               {isVerified
//                 ? "Email Verified ✅"
//                 : "Send OTP"}
//             </button>

//             <Input
//               value={password}
//               onChange={({
//                 target,
//               }) =>
//                 setPassword(
//                   target.value
//                 )
//               }
//               label="Password"
//               placeholder="Min. 8 characters"
//               type="password"
//             />

//           </div>

//           {error && (

//             <p className="text-red-500 text-xs pb-2.5 mt-2">
//               {error}
//             </p>
//           )}

//           <button
//             type="button"
//             className="btn-primary mt-3"
//             onClick={
//               handleSignUP
//             }
//           >
//             SIGN UP
//           </button>

//           <p className="text-[13px] text-slate-800 mt-3">

//             Already have an account?{" "}

//             <button
//               type="button"
//               className="font-medium text-primary underline cursor-pointer"
//               onClick={() =>
//                 setCurrentPage(
//                   "login"
//                 )
//               }
//             >
//               Log In
//             </button>

//           </p>
//         </div>
//       </div>

//       {/* OTP MODAL */}
//       {showOtpModal && (

//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">

//           <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">

//             <h2 className="text-2xl font-bold text-black">
//               Verify OTP
//             </h2>

//             <p className="text-sm text-slate-600 mt-2">
//               Enter the OTP sent to your email.
//             </p>

//             <div className="mt-5">

//               <Input
//                 value={otp}
//                 onChange={({
//                   target,
//                 }) =>
//                   setOtp(
//                     target.value
//                   )
//                 }
//                 label="OTP"
//                 placeholder="Enter 6-digit OTP"
//                 type="text"
//               />

//             </div>

//             <button
//               onClick={
//                 handleVerifyOtp
//               }
//               className="btn-primary w-full mt-4"
//             >
//               Verify OTP
//             </button>

//             <button
//               type="button"
//               onClick={() =>
//                 setShowOtpModal(
//                   false
//                 )
//               }
//               className="w-full mt-3 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
//             >
//               Cancel
//             </button>

//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default SignUp;


  import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import Input from "../../component/Inputs/Input.jsx";

import ProfilePhotoSelector from "../../component/Inputs/ProfilePhotoSelector";

import { validateEmail } from "../../utils/helper";

import { UserContext } from "../../context/userContext";

import axiosInstance from "../../utils/axiosinstance";

import { API_PATHS } from "../../utils/apiPaths";

const SignUp = ({ setCurrentPage }) => {

  const { updateUser } =
    useContext(UserContext);

  const navigate = useNavigate();

  const [profilePic, setProfilePic] =
    useState(null);

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  // IMAGE UPLOAD
  const uploadImage = async (
    imageFile
  ) => {

    const formData =
      new FormData();

    formData.append(
      "image",
      imageFile
    );

    const res =
      await axiosInstance.post(
        API_PATHS.IMAGE.UPLOAD_IMAGE,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return res.data;
  };

  // SIGNUP
  const handleSignUP =
    async () => {

      if (
        !fullName.trim()
      ) {

        setError(
          "Please enter full name."
        );

        return;
      }

      if (
        !validateEmail(email)
      ) {

        setError(
          "Please enter a valid email address."
        );

        return;
      }

      if (!password) {

        setError(
          "Please enter the password."
        );

        return;
      }

      setError("");

      try {

        let profileImageUrl =
          "";

        if (profilePic) {

          const imgUploadRes =
            await uploadImage(
              profilePic
            );

          profileImageUrl =
            imgUploadRes.imageUrl ||
            "";
        }

        const response =
          await axiosInstance.post(
            API_PATHS.AUTH.REGISTER,
            {
              name:
                fullName.trim(),

              email:
                email.toLowerCase(),

              password,

              profileImageUrl,
            }
          );

        updateUser({

          name:
            response.data.user.name ||
            fullName,

          email:
            response.data.user.email,

          profileImageUrl:
            response.data.user
              .profileImageUrl,

          token:
            response.data.token,
        });

        navigate(
          "/dashboard"
        );

      } catch (err) {

        console.error(
          "SIGNUP ERROR:",
          err?.response?.data
        );

        setError(
          err?.response?.data
            ?.message ||
            "Registration failed. Please try again."
        );
      }
    };

  return (

    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">

      <h3 className="text-lg font-semibold text-black">
        Create an Account
      </h3>

      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Join us today by entering your details below.
      </p>

      <div>

        <ProfilePhotoSelector
          image={profilePic}
          setImage={setProfilePic}
        />

        <div className="grid grid-cols-1 gap-2">

          <Input
            value={fullName}
            onChange={({
              target,
            }) =>
              setFullName(
                target.value
              )
            }
            label="Full Name"
            placeholder="John"
            type="text"
          />

          <Input
            value={email}
            onChange={({
              target,
            }) =>
              setEmail(
                target.value
              )
            }
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({
              target,
            }) =>
              setPassword(
                target.value
              )
            }
            label="Password"
            placeholder="Min. 8 characters"
            type="password"
          />

        </div>

        {error && (

          <p className="text-red-500 text-xs pb-2.5 mt-2">
            {error}
          </p>
        )}

        <button
          type="button"
          className="btn-primary mt-3"
          onClick={
            handleSignUP
          }
        >
          SIGN UP
        </button>

        <p className="text-[13px] text-slate-800 mt-3">

          Already have an account?{" "}

          <button
            type="button"
            className="font-medium text-primary underline cursor-pointer"
            onClick={() =>
              setCurrentPage(
                "login"
              )
            }
          >
            Log In
          </button>

        </p>
      </div>
    </div>
  );
};

export default SignUp;