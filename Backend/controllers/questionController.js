const Question = require("../models/Question");
const Session = require("../models/Session");

/* ============================
   ADD QUESTIONS TO SESSION
============================ */
exports.addQuestionsToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;

    if (!sessionId || !questions || !Array.isArray(questions)) {
      return res.status(400).json({
        success: false,
        message: "Invalid input data",
      });
    }

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    // 🚨 IMPORTANT: Remove old questions (prevents mixing)
    await Question.deleteMany({ _id: { $in: session.questions } });

    // Clear existing references
    session.questions = [];

    // ✅ Create new questions
    const createdQuestions = await Question.insertMany(
      questions.map((q) => ({
        question: q.question,
        answer: q.answer,
        isPinned: false,
      }))
    );

    // ✅ Save new question IDs
    const questionIds = createdQuestions.map((q) => q._id);

    session.questions = questionIds;
    await session.save();

    return res.status(200).json({
      success: true,
      message: "Questions added successfully",
      questions: createdQuestions,
    });

  } catch (error) {
    console.error("ADD QUESTIONS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ============================
   TOGGLE PIN QUESTION
============================ */
exports.togglePinQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    // ✅ Correct toggle
    question.isPinned = !question.isPinned;

    await question.save();

    return res.status(200).json({
      success: true,
      question,
    });

  } catch (error) {
    console.error("PIN ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ============================
   UPDATE QUESTION NOTE
============================ */
exports.updateQuestionNote = async (req, res) => {
  try {
    const { note } = req.body;

    if (note === undefined) {
      return res.status(400).json({
        success: false,
        message: "Note is required",
      });
    }

    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    question.note = note;
    await question.save();

    return res.status(200).json({
      success: true,
      question,
    });

  } catch (error) {
    console.error("NOTE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};