const fs = require("fs");
const Groq = require("groq-sdk");

const { parseResume } = require("../utils/parseResume");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const checkATSScore = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file required",
      });
    }

    const resumeText = await parseResume(
      req.file.path,
      req.file.mimetype
    );

    const prompt = `
You are a world-class ATS Resume Analyzer used by top tech companies.

Analyze the following resume deeply like a real recruiter + ATS system.

You must provide VERY DETAILED analysis.

Return ONLY valid JSON in this exact format:

{
  "score": 85,

  "missingSkills": [
    "Docker",
    "AWS",
    "CI/CD"
  ],

  "weakSections": [
    "Projects",
    "Achievements"
  ],

  "formattingIssues": [
    "Resume summary is too long",
    "Projects lack proper spacing"
  ],

  "improvements": [
    "Add measurable achievements with numbers",
    "Improve project descriptions with impact",
    "Add modern backend tools and deployment skills",
    "Include GitHub and portfolio links",
    "Use stronger action verbs"
  ],

  "strengths": [
    "Strong MERN stack foundation",
    "Good frontend project experience",
    "Clear technical skills section"
  ],

  "recommendedProjects": [
    "Real-time chat application",
    "AI powered SaaS project",
    "Microservices backend project"
  ],

  "careerSuggestions": [
    "Focus on backend scalability concepts",
    "Learn Docker and AWS for better ATS ranking",
    "Build production-level full stack projects"
  ],

  "summary": "This resume shows strong potential for entry-level software engineering roles, especially in MERN stack development. The candidate demonstrates a good understanding of frontend and backend technologies with multiple technical projects. However, the resume lacks measurable achievements, advanced deployment skills, and industry-standard tooling such as Docker, CI/CD, and cloud technologies. Improving project impact descriptions and adding stronger technical depth would significantly increase ATS performance and recruiter attention. Overall, this is a promising resume that can become highly competitive with better optimization and more production-level experience."
}

VERY IMPORTANT RULES:
- Be highly intelligent and detailed
- Give realistic recruiter-level feedback
- Summary must be 6-10 lines long
- Give meaningful improvements
- Mention modern tech skills if missing
- Analyze project quality
- Analyze ATS readability
- Analyze technical depth
- Analyze industry readiness
- Do NOT give generic answers
- Return ONLY JSON

Resume:
${resumeText}
`;

    const completion =
      await groq.chat.completions.create({
       model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.3,
      });

    const aiResponse =
      completion.choices[0]?.message?.content;

    const cleaned = aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    fs.unlinkSync(req.file.path);

    res.status(200).json({
      success: true,
      data: parsed,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { checkATSScore };