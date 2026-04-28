import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosinstance";

const InterviewSession = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const questions = location.state?.questions || [];

  const [currentIndex, setCurrentIndex] = useState(0);

  // STORE ALL ANSWERS
  const [answers, setAnswers] = useState({});

  // FINAL RESULT
  const [finalScore, setFinalScore] = useState(null);
  const [allFeedbacks, setAllFeedbacks] = useState([]);

  const currentQuestion = questions[currentIndex];

  // HANDLE ANSWER
  const handleAnswerChange = (e) => {
    setAnswers({
      ...answers,
      [currentIndex]: e.target.value,
    });
  };

  // NEXT
  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // PREVIOUS
  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // SUBMIT ALL QUESTIONS
  const submitInterview = async () => {
    try {

      let totalScore = 0;
      let feedbackArray = [];

      for (let i = 0; i < questions.length; i++) {

        const res = await axiosInstance.post("/api/ai/evaluate", {
          question: questions[i].question,
          answer: answers[i] || "No Answer",
        });

        totalScore += res.data.score || 0;

        feedbackArray.push({
          question: questions[i].question,
          answer: answers[i] || "No Answer",
          score: res.data.score,
          feedback: res.data.feedback,
        });
      }

      const avgScore = totalScore / questions.length;

      setFinalScore(avgScore);
      setAllFeedbacks(feedbackArray);

    } catch (err) {
      console.log(err);
    }
  };

  // FINAL RESULT PAGE
  if (finalScore !== null) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white p-10">

        <div className="max-w-5xl mx-auto">

          {/* RESULT CARD */}
          <div className="bg-white/10 border border-white/10 rounded-3xl p-10 text-center mb-10">

            <h1 className="text-6xl font-bold mb-6">
              🎉 Interview Completed
            </h1>

            <div className="text-8xl font-bold text-green-400 mb-6">
              {Math.floor(finalScore)}/100
            </div>

            {finalScore >= 80 && (
              <p className="text-green-400 text-2xl">
                Excellent Performance 🚀
              </p>
            )}

            {finalScore >= 50 && finalScore < 80 && (
              <p className="text-yellow-400 text-2xl">
                Good Job 👍
              </p>
            )}

            {finalScore < 50 && (
              <p className="text-red-400 text-2xl">
                Need More Practice 📚
              </p>
            )}

          </div>

          {/* ALL FEEDBACKS */}
          <div className="space-y-8">

            {allFeedbacks.map((item, index) => (

              <div
                key={index}
                className="bg-white/10 border border-white/10 rounded-3xl p-8"
              >

                <h2 className="text-2xl font-bold mb-4 text-purple-300">
                  Question {index + 1}
                </h2>

                <p className="text-xl mb-4">
                  {item.question}
                </p>

                <div className="mb-4">
                  <span className="font-bold text-green-400">
                    Your Answer:
                  </span>

                  <p className="mt-2 text-gray-300">
                    {item.answer}
                  </p>
                </div>

                <div className="text-green-400 text-2xl font-bold mb-4">
                  Score: {item.score}/100
                </div>

                <div className="bg-[#1e293b] p-5 rounded-2xl whitespace-pre-wrap">
                  {item.feedback}
                </div>

              </div>

            ))}

          </div>

          {/* DASHBOARD BUTTON */}
          <div className="text-center mt-10">

            <button
              onClick={() => navigate("/dashboard")}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500"
            >
              Back To Dashboard
            </button>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">

      <div className="max-w-4xl mx-auto">

        {/* TOP */}
        <div className="flex justify-between items-center mb-6">

          <h1 className="text-5xl font-bold">
            AI Interview
          </h1>

          <div className="bg-white/10 px-5 py-3 rounded-2xl">
            Question {currentIndex + 1} / {questions.length}
          </div>

        </div>

        {/* QUESTION CARD */}
        <div className="bg-white/10 border border-white/10 rounded-3xl p-10">

          <h2 className="text-3xl font-semibold leading-relaxed mb-10">
            {currentQuestion?.question}
          </h2>

          {/* ANSWER BOX */}
          <textarea
            value={answers[currentIndex] || ""}
            onChange={handleAnswerChange}
            placeholder="Type your answer..."
            className="w-full h-48 p-6 rounded-2xl bg-[#1e293b] border border-white/10 outline-none text-white text-lg resize-none"
          />

          {/* BUTTONS */}
          <div className="flex gap-4 mt-8">

            <button
              onClick={prevQuestion}
              disabled={currentIndex === 0}
              className="px-6 py-3 rounded-2xl bg-gray-600 disabled:opacity-50"
            >
              Previous
            </button>

            <button
              onClick={nextQuestion}
              disabled={currentIndex === questions.length - 1}
              className="px-6 py-3 rounded-2xl bg-blue-600"
            >
              Next
            </button>

            {/* FINAL SUBMIT */}
            {currentIndex === questions.length - 1 && (

              <button
                onClick={submitInterview}
                className="px-8 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500"
              >
                Submit Interview
              </button>

            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default InterviewSession;