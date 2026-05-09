

const fetch = global.fetch;

/* ============================
   GENERATE INTERVIEW QUESTIONS
============================ */
exports.generateInterviewQuestion = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    console.log("🚀 Groq generating questions...");

    const prompt = `
You are a senior technical interviewer.

Generate ${numberOfQuestions} HIGH-QUALITY technical interview questions.

STRICT RULES:
- Questions must be purely technical
- DO NOT ask personal or experience-based questions
- Focus on concepts, problem-solving, and real-world scenarios

🚨 VERY IMPORTANT:
- ALL questions MUST be strictly based ONLY on:
"${topicsToFocus}"

Return ONLY JSON:

[
  { "question": "technical question", "answer": "short answer" }
]

Role: ${role}
Experience: ${experience}
`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const result = await response.json();
    const rawText = result?.choices?.[0]?.message?.content;

    let data;
    try {
      const json = rawText.slice(rawText.indexOf("["), rawText.lastIndexOf("]") + 1);
      data = JSON.parse(json);
    } catch {
      data = fallback(role, topicsToFocus, numberOfQuestions);
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error(error);
    return res.status(200).json(fallback("Developer", "General", 10));
  }
};

/* ============================
   GENERATE EXPLANATION
============================ */
exports.generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: `Explain:\n${question}` }],
        temperature: 0.6,
      }),
    });

    const result = await response.json();

    return res.status(200).json({
      title: question,
      explanation: result?.choices?.[0]?.message?.content || "No explanation",
    });

  } catch {
    return res.status(200).json({
      title: req.body.question,
      explanation: "Failed",
    });
  }
};

/* ============================
   🔥 FIXED EVALUATION (IMPORTANT)
============================ */
exports.evaluateAnswer = async (req, res) => {
  try {
    const { question, answer } = req.body;

    console.log("🚀 Evaluating answer...");

    const normalized = (answer || "").trim().toLowerCase();

    const invalidAnswers = [
      "i dont know",
      "i don't know",
      "dont know",
      "no idea",
      "idk",
      "nothing",
      "na",
      "none"
    ];

    // ❌ HARD BLOCK
    if (
      !normalized ||
      normalized.length < 20 ||
      invalidAnswers.includes(normalized) ||
      /^[a-zA-Z]$/.test(normalized)
    ) {
      return res.status(200).json({
        score: 0,
        feedback: `
Score: 0

Strengths:
- None

Weaknesses:
- No meaningful answer provided

Suggestions:
- Provide a proper technical explanation
`
      });
    }

    const prompt = `
You are a STRICT senior interviewer.

RULES:
- Be strict
- Do not assume missing info
- Penalize vague answers

Evaluate:

Score: (0-100)

Strengths:
- point

Weaknesses:
- point

Suggestions:
- point

Question: ${question}
Answer: ${answer}
`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2
      }),
    });

    const result = await response.json();

    const feedbackText = result?.choices?.[0]?.message?.content || "No feedback";

    const match = feedbackText.match(/Score:\s*(\d+)/i);
    let score = match ? parseInt(match[1]) : 0;

    if (score > 100) score = 100;
    if (score < 0) score = 0;

    return res.status(200).json({
      feedback: feedbackText,
      score
    });

  } catch (err) {
    console.error(err);
    return res.status(200).json({
      score: 0,
      feedback: "Evaluation failed"
    });
  }
};

/* ============================
   FALLBACK
============================ */
const fallback = (role, topics, count = 10) => {
  return Array.from({ length: count }).map((_, i) => ({
    question: `Explain ${topics} concept ${i + 1}`,
    answer: `${topics} is important in ${role}`
  }));
};