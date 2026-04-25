import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosinstance";
import { useParams } from "react-router-dom";

const InterviewSession = () => {
  const { id } = useParams();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(null);

  const currentQuestion = questions[currentIndex];

  // 🔥 Fetch questions
  const fetchQuestions = async () => {
    try {
      const res = await axiosInstance.get(`/api/sessions/${id}`);
      setQuestions(res.data.session.questions);
    } catch (err) {
      console.log("Error fetching questions:", err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // 🔥 Submit Answer
  const submitAnswer = async () => {
    try {
      const res = await axiosInstance.post("/api/ai/evaluate", {
        question: currentQuestion.question,
        answer: answer,
      });

      setFeedback(res.data.feedback);
      setScore(res.data.score);
    } catch (err) {
      console.log("AI Error:", err);
    }
  };

  // 🔥 Next Question
  const nextQuestion = () => {
    setAnswer("");
    setFeedback("");
    setScore(null);
    setCurrentIndex((prev) => prev + 1);
  };

  if (!currentQuestion) {
    return <h2 style={{ textAlign: "center" }}>🎉 Interview Completed</h2>;
  }

  return (
    <div style={{ padding: "40px", maxWidth: "700px", margin: "auto" }}>
      <h2>Question {currentIndex + 1}</h2>
      <p>{currentQuestion.question}</p>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer..."
        style={{ width: "100%", height: "100px", marginTop: "10px" }}
      />

      <button onClick={submitAnswer} style={{ marginTop: "10px" }}>
        Submit Answer
      </button>

      {score && (
        <div style={{ marginTop: "20px" }}>
          <h3>Score: {score}/100</h3>
          <p>{feedback}</p>

          <button onClick={nextQuestion}>
            Next Question →
          </button>
        </div>
      )}
    </div>
  );
};

export default InterviewSession;