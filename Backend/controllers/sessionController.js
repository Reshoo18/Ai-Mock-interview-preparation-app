const mongoose = require("mongoose");

const Session = require("../models/Session");
const Question = require("../models/Question");

// Create a new session
exports.createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } = req.body;
    const userId = req.user._id;

    // Create the session
    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
    });

    // Create related questions
    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const newQuestion = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        });
        return newQuestion._id;
      })
    );

    session.questions = questionDocs;
    await session.save();

    res.status(201).json({ success: true, session });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all sessions for current user
exports.getMySessions = async (req, res) => {
  try {
    const Sessions = await Session.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("questions");
    res.status(200).json({ success: true, Sessions });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get a session by ID
// exports.getSessionById = async (req, res) => {
//   try {
//     const session = await Session.findById(req.params.id)
//       .populate({
//         path: "questions",
//         options: { sort: { isPinned: -1, createdAt: 1 } },
//       })
//       .exec();

//     if (!session) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Session not found" });
//     }

//     res.status(200).json({ success: true, session });
//   } catch (error) {
//     console.error("Error fetching session by ID:", error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };
// controllers/sessionController.js


exports.getSessionById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate id early to avoid Mongoose CastError
    if (!mongoose.isValidObjectId(id)) {
      console.warn(`getSessionById - invalid id: ${id}`);
      return res.status(400).json({ success: false, message: "Invalid session id" });
    }

    const session = await Session.findById(id)
      .populate({
        path: "questions",
        options: { sort: { isPinned: -1, createdAt: 1 } },
      })
      .exec();

    if (!session) {
      return res.status(404).json({ success: false, message: "Session not found" });
    }

    return res.status(200).json({ success: true, session });
  } catch (error) {
    console.error("Error fetching session by ID:", error);
    return res
    .status(500)
    .json({ success: false, message: "Server Error", error: error.message });
  }
};

// Delete a session and its questions
exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(400).json({message:"Session not found"})
        .status(404)
        .json({ success: false, message: "Session not found" });
    }
    

    // Optional: only allow the session owner to delete
    if (session.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized to delete" });
    }

    await Question.deleteMany({ session: session._id });
    await session.deleteOne();

    res.status(200).json({ success: true, message: "Session deleted successfully" });
  } catch (error) {
    console.error("Error deleting session:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
