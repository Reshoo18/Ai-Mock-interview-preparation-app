const { questionAnswerPrompt, conceptExplainPrompt } = require("../utils/prompts");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/* ============================
   Generate Interview Questions
============================ */

const generateInterviewQuestion = async (req, res) => {
  try {
    let { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (Array.isArray(topicsToFocus)) {
      topicsToFocus = topicsToFocus.join(", ");
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // ✅ FIXED
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const rawText =
      response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    let data;

    try {
      data = JSON.parse(cleanedText);
    } catch {
      data = { text: cleanedText };
    }

    res.status(200).json(data);

  } catch (error) {
    console.error("GenAI error:", error);
    res.status(500).json({
      message: "Failed to generate question",
      error: error.message,
    });
  }
};

/* ============================
   Generate Explanation
============================ */

const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = conceptExplainPrompt(question);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // ✅ FIXED
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const rawText =
      response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    let data;

    try {
      data = JSON.parse(cleanedText);
    } catch {
      data = { text: cleanedText };
    }

    res.status(200).json(data);

  } catch (error) {
    console.error("GenAI error:", error);
    res.status(500).json({
      message: "Failed to generate explanation",
      error: error.message,
    });
  }
};

module.exports = {
  generateInterviewQuestion,
  generateConceptExplanation,
};
