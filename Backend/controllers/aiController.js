// controllers/aiController.js

const { questionAnswerPrompt, conceptExplainPrompt } = require("../utils/prompts");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Generate Interview Questions
const generateInterviewQuestion = async (req, res) => {
    try {
        let { role, experience, topicsToFocus, numberOfQuestions } = req.body;

        // Validate required fields
        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Convert topics array to string if needed
        if (Array.isArray(topicsToFocus)) {
            topicsToFocus = topicsToFocus.join(", ");
        }

        // Generate prompt
        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

        //console.log("Generated prompt:", prompt);

        // Send prompt to Google GenAI
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: [{ type: "text", text: prompt }],
        });

        const rawText = response?.text || "";

        const cleanedText = rawText
            .replace(/^```json\s*/, "")
            .replace(/```$/, "")
            .trim();

        const data = JSON.parse(cleanedText);

        res.status(200).json(data);
    } catch (error) {
        console.error("GenAI error:", error);
        res.status(500).json({
            message: "Failed to generate question",
            error: error.message,
        });
    }
};

// Generate Concept Explanation
const generateConceptExplanation = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ message: "Question is required" });
        }

        // Generate prompt
        const prompt = conceptExplainPrompt(question);

        console.log("Generated explanation prompt:", prompt);

        // Send prompt to Google GenAI
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: [{ type: "text", text: prompt }],
        });

        const rawText = response?.text || "";

        const cleanedText = rawText
            .replace(/^```json\s*/, "")
            .replace(/```$/, "")
            .trim();

        const data = JSON.parse(cleanedText);

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
