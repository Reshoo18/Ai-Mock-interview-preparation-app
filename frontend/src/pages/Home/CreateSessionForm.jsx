


import React, { useState } from 'react'
import Input from "../../component/Inputs/Input"
import axiosInstance from "../../utils/axiosinstance"
import { API_PATHS } from "../../utils/apiPaths"
import toast from "react-hot-toast";

const CreateSessionForm = ({ onSuccess }) => {

  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();

    const { role, experience, topicsToFocus } = formData;

    if (!role || !experience || !topicsToFocus) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const res = await axiosInstance.post(
        API_PATHS.SESSION.CREATE,
        formData
      );

      toast.success("Session Created!");

      // ✅ REFRESH DASHBOARD + CLOSE MODAL
      if (onSuccess) onSuccess();

      // optional reset
      setFormData({
        role: "",
        experience: "",
        topicsToFocus: "",
        description: "",
      });

    } catch (err) {
      console.error(err);
      setError("Failed to create session");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>
        Start a New Interview Journey
      </h3>

      <p className='text-xs text-state-700 mt-[5px] mb-3'>
        Fill out a few quick details and unlock your personalized set of interview questions!
      </p>

      <form onSubmit={handleCreateSession} className='flex flex-col gap-3'>

        <Input
          value={formData.role}
          onChange={({ target }) => handleChange("role", target.value)}
          label="Target Role"
          placeholder="Frontend Developer..."
          type="text"
        />

        <Input
          value={formData.experience}
          onChange={({ target }) => handleChange("experience", target.value)}
          label="Years of Experience"
          type="number"
        />

        <Input
          value={formData.topicsToFocus}
          onChange={({ target }) => handleChange("topicsToFocus", target.value)}
          label="Topics to Focus On"
          placeholder="React, Node.js..."
          type="text"
        />

        <Input
          value={formData.description}
          onChange={({ target }) => handleChange("description", target.value)}
          label="Description"
          type="text"
        />

        {error && (
          <p className='text-red-500 text-xs pb-2.5'>{error}</p>
        )}

        <button
          type='submit'
          className='btn-primary w-full mt-2'
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Session"}
        </button>

      </form>
    </div>
  );
};

export default CreateSessionForm;
