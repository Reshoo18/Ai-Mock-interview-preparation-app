// 
const { googleGenAi, GoogleGenAI } = require("@google/genai");
const { conceptExplainPromt } = require("../utils/prompts");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const generateInterviewQuestion = async (req, res) => {
    try {
        // Your logic here
        res.status(200).json({ message: "Question generated successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Failed to generate question",
            error: error.message,
        });
    }
};

const generateConceptExplanation = async (req, res) => {
    try {
        // Your logic here
        res.status(200).json({ message: "Explanation generated successfully" });
    } catch (error) {
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
