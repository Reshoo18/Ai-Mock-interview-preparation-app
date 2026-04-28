


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
- DO NOT use phrases like:
  "What is your experience..."
  "Have you worked on..."
- Focus on concepts, problem-solving, and real-world scenarios

🚨 VERY IMPORTANT:
- ALL questions MUST be strictly based ONLY on the following topic:
"${topicsToFocus}"
- DO NOT generate generic programming or JavaScript questions unless the topic is programming
- If the topic is non-technical (like school subject), generate conceptual questions from that subject

Each answer must be short (1–2 lines only)

Return ONLY JSON:

[
  { "question": "technical question", "answer": "short answer" }
]

Role: ${role}
Experience: ${experience}
`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
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
      }
    );

    if (!response.ok) {
      throw new Error("Groq question generation failed");
    }

    const result = await response.json();

    const rawText = result?.choices?.[0]?.message?.content;

    let data;

    try {
      const start = rawText.indexOf("[");
      const end = rawText.lastIndexOf("]");

      const json = rawText.slice(start, end + 1);
      data = JSON.parse(json);
    } catch {
      console.log("⚠️ JSON parsing failed → using fallback");
      data = fallback(role, topicsToFocus, numberOfQuestions);
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error("🔥 ERROR:", error.message);

    return res.status(200).json(
      fallback("Developer", "General", 10)
    );
  }
};


/* ============================
   GENERATE EXPLANATION
============================ */
exports.generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    console.log("🚀 Groq explanation...");

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "user",
              content: `Explain this interview question clearly:\n${question}`,
            },
          ],
          temperature: 0.6,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Groq explanation failed");
    }

    const result = await response.json();

    const explanation =
      result?.choices?.[0]?.message?.content ||
      "No explanation available";

    return res.status(200).json({
      title: question,
      explanation,
    });

  } catch (error) {
    console.error("🔥 ERROR:", error.message);

    return res.status(200).json({
      title: req.body.question,
      explanation: "Failed to generate explanation",
    });
  }
};


/* ============================
   AI ANSWER EVALUATION (NEW)
============================ */
exports.evaluateAnswer = async (req, res) => {
  try {
    const { question, answer } = req.body;

    console.log("🚀 Groq evaluating answer...");

    const prompt = `
You are an AI interview evaluator.

Evaluate the answer based on:
- correctness
- clarity
- technical depth

Return EXACT format:

Score: (0-100)

Strengths:
- point 1
- point 2

Weaknesses:
- point 1
- point 2

Suggestions:
- point 1
- point 2

Question: ${question}
Answer: ${answer}
`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
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
      }
    );

    if (!response.ok) {
      throw new Error("Groq evaluation failed");
    }

    const result = await response.json();

    const feedbackText =
      result?.choices?.[0]?.message?.content ||
      "No feedback generated";

    // 🔥 Extract score
    const scoreMatch = feedbackText.match(/Score:\s*(\d+)/i);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;

    return res.status(200).json({
      feedback: feedbackText,
      score: score
    });

  } catch (error) {
    console.error("🔥 GROQ EVALUATION ERROR:", error.message);

    return res.status(200).json({
      feedback: "Failed to evaluate answer",
      score: 0
    });
  }
};


/* ============================
   FALLBACK (SAFE GENERATOR)
============================ */
const fallback = (role, topics, count = 10) => {
  let topicList = topics.includes(",")
    ? topics.split(",")
    : topics.split(" ");

  topicList = topicList.map((t) => t.trim()).filter(Boolean);

  const questions = [];

  const templates = [
    "What is",
    "Explain",
    "Why is",
    "How does",
    "Advantages of",
    "Real-world use of",
    "Common mistakes in",
    "Lifecycle of",
    "How to optimize",
    "Advanced concept of"
  ];

  for (let i = 0; i < count; i++) {
    const topic = topicList[i % topicList.length];
    const template = templates[i % templates.length];

    questions.push({
      question: `${template} ${topic} in ${role}?`,
      answer: `${topic} is an important concept in ${role}. It helps build scalable and efficient systems.`,
    });
  }

  return questions;
};