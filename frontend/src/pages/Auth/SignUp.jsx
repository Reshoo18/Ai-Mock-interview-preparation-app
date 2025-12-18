

// import { useState, useContext } from 'react';
// import Input from '../../component/Inputs/input';
// import ProfilePhotoSelector from '../../component/Inputs/ProfilePhotoSelector';
// import { validateEmail } from '../../utils/helper';
// import { UserContext } from '../../context/userContext';
// import axiosInstance from '../../utils/axiosinstance';
// import { API_PATHS } from '../../utils/apiPaths';

// const SignUp = ({ setCurrentPage }) => {
//   const { updateUser } = useContext(UserContext);

//   const [profilePic, setProfilePic] = useState(null);
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

//   // Handle SignUp Form Submit
//   const handleSignUP = async (e) => {
//     e.preventDefault();

//     if (!fullName) {
//       setError("Please enter full name.");
//       return;
//     }

//     if (!validateEmail(email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }

//     if (!password) {
//       setError("Please enter the password.");
//       return;
//     }

//     setError(null);

//     try {
//        if(profilePic){
//         const imgUploadRes=await uploadImage(profilePic);
//         profileImageUrl=imgUploadRes.imageUrl || "";
//        }
      
//       const response = await axiosInstance.post(
//      API_PATHS.AUTH.REGISTER, {
//         name: fullName,
//         email,
//         password,
//         profileImageUrl,
//       });

//       const {token}=response.data;

//       if(token){
//         localStorage.setItem("token",token)
//         updateUser(response.data);
//         naviagate("/dashboard")
//       }

      

//     } catch (error) {
//       if (error.response?.data?.message) {
//         setError(error.response.data.message);
//       } else {
//         setError("Something went wrong. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
//       <h3 className="text-lg font-semibold text-black">Create an Account</h3>
//       <p className="text-xs text-slate-700 mt-[5px] mb-6">
//         Join us today by entering your details below.
//       </p>

//       <form>
//         <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

//         <div className="grid grid-cols-1 gap-2">
//           <Input
//             value={fullName}
//             onChange={({ target }) => setFullName(target.value)}
//             label="Full Name"
//             placeholder="John"
//             type="text"
//           />

//           <Input
//             value={email}
//             onChange={({ target }) => setEmail(target.value)}
//             label="Email Address"
//             placeholder="john@example.com"
//             type="text"
//           />

//           <Input
//             value={password}
//             onChange={({ target }) => setPassword(target.value)}
//             label="Password"
//             placeholder="Min. 8 characters"
//             type="password"
//           />
//         </div>

//         {error && (
//           <p className="text-red-500 text-xs pb-2.5">{error}</p>
//         )}

//         {/* <button type="submit" className="btn-primary">
//           SIGN UP
//         </button> */}
//         <button
//   type="button"
//   className="btn-primary"
//   onClick={handleSignUP}
// >
//   SIGN UP
// </button>


//         <p className="text-[13px] text-slate-800 mt-3">
//           Already have an account?{" "}
//           <button
//             type="button"
//             className="font-medium text-primary underline cursor-pointer"
//             onClick={() => setCurrentPage("login")}
//           >
//             Log In
//           </button>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default SignUp;

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../component/Inputs/input";
import ProfilePhotoSelector from "../../component/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";

const SignUp = ({ setCurrentPage }) => {
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 🔹 upload image helper
  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return res.data;
  };

  const handleSignUP = async () => {
    if (!fullName.trim()) {
      setError("Please enter full name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password.");
      return;
    }

    setError("");

    try {
      let profileImageUrl = "";

      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        {
          name: fullName.trim(),
          email: email.toLowerCase(),
          password,
          profileImageUrl,
        }
      );

      // ✅ normalize response
      // updateUser({
      //   ...response.data.user,
      //   token: response.data.token,
      // });
      updateUser({
  name:
    response.data.user.name ||
    response.data.user.fullName ||
    fullName,
  email: response.data.user.email,
  profileImageUrl: response.data.user.profileImageUrl,
  token: response.data.token,
});

      navigate("/dashboard");

    } catch (err) {
      console.error("SIGNUP ERROR:", err?.response?.data);
      setError(
        err?.response?.data?.message ||
        "Registration failed. Please try again."
      );
    }
  };

  

    
  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Create an Account</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Join us today by entering your details below.
      </p>

      <div>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        <div className="grid grid-cols-1 gap-2">
          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="John"
            type="text"
          />

          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min. 8 characters"
            type="password"
          />
        </div>

        {error && (
          <p className="text-red-500 text-xs pb-2.5 mt-2">{error}</p>
        )}

        <button
          type="button"
          className="btn-primary mt-3"
          onClick={handleSignUP}
        >
          SIGN UP
        </button>

        <p className="text-[13px] text-slate-800 mt-3">
          Already have an account?{" "}
          <button
            type="button"
            className="font-medium text-primary underline cursor-pointer"
            onClick={() => setCurrentPage("login")}
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
