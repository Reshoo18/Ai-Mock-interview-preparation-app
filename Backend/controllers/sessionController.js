
const mongoose = require("mongoose");
const Session = require("../models/Session");
const Question = require("../models/Question");

// ===============================
// Create a new session
// ===============================
const axios = require("axios");

exports.createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description } = req.body;
    const userId = req.user._id;

    // 🔥 STEP 1: Generate AI Questions
    const prompt = `
Generate 5 interview questions and answers in JSON format:

[
 { "question": "...", "answer": "..." }
]

Role: ${role}
Experience: ${experience}
Topics: ${topicsToFocus}
`;

    let aiQuestions = [];

    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
        { inputs: prompt },
        {
          headers: {
            Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          },
        }
      );

      const text = response.data?.[0]?.generated_text || "";

      const start = text.indexOf("[");
      const end = text.lastIndexOf("]") + 1;
      const json = text.slice(start, end);

      aiQuestions = JSON.parse(json);

    } catch (err) {
      console.log("⚠️ AI failed → using fallback");

      aiQuestions = [
        { question: "What is React state?", answer: "State manages UI data." },
        { question: "Explain Virtual DOM", answer: "Improves performance." },
        { question: "What is useEffect?", answer: "Handles side effects." },
        { question: "What is JSX?", answer: "JS syntax for UI." },
        { question: "What is props?", answer: "Pass data between components." },
      ];
    }
    

    // 🔥 STEP 2: Create session
    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
    });

    // 🔥 STEP 3: Save questions
    const createdQuestions = await Question.insertMany(
      aiQuestions.map((q) => ({
        session: session._id,
        question: q.question,
        answer: q.answer,
      }))
    );

    // 🔥 STEP 4: Link to session
    session.questions = createdQuestions.map((q) => q._id);
    await session.save();

    return res.status(201).json({
      success: true,
      session,
    });

  } catch (error) {
    console.error("Create session error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// Get all sessions for logged-in user
// ===============================
exports.getMySessions = async (req, res) => {
  try {
    // 🚫 Disable browser cache (CRITICAL)
    res.set("Cache-Control", "no-store");

    const sessions = await Session.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select("-questions"); // 🚀 faster dashboard load

    return res.status(200).json({
      success: true,
      sessions,
    });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// Get session by ID
// ===============================
exports.getSessionById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid session id",
      });
    }

    const session = await Session.findById(id).populate({
      path: "questions",
      options: { sort: { isPinned: -1, createdAt: 1 } },
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    return res.status(200).json({
      success: true,
      session,
    });
  } catch (error) {
    console.error("Error fetching session:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// Delete session
// ===============================
exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    if (session.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Question.deleteMany({ session: session._id });
    await session.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Session deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting session:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

