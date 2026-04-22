

const fetch = global.fetch;

/* ============================
   GENERATE INTERVIEW QUESTIONS
============================ */
exports.generateInterviewQuestion = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    console.log("🚀 Groq generating for:", role);

    const prompt = `
Return ONLY valid JSON array.

NO explanation. NO extra text.

Format:
[
  { "question": "string", "answer": "string" }
]

Generate ${numberOfQuestions} UNIQUE interview questions.

Role: ${role}
Experience: ${experience}
Topics: ${topicsToFocus}
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

    // ✅ Check HTTP error
    if (!response.ok) {
      const errText = await response.text();
      console.log("❌ HTTP ERROR:", errText);
      throw new Error("Groq request failed");
    }

    const result = await response.json();

    console.log("FULL GROQ RESPONSE:", result);

    // ❌ API error
    if (result.error) {
      console.log("❌ GROQ API ERROR:", result.error);
      throw new Error(result.error.message);
    }

    const rawText = result?.choices?.[0]?.message?.content;

    if (!rawText) {
      console.log("❌ Empty response from Groq");
      throw new Error("Empty response");
    }

    console.log("🔥 RAW:", rawText);

    let data;

    try {
      // ✅ Extract JSON safely
      const start = rawText.indexOf("[");
      const end = rawText.lastIndexOf("]");

      if (start !== -1 && end !== -1) {
        const json = rawText.slice(start, end + 1);
        data = JSON.parse(json);
      } else {
        throw new Error("No JSON found");
      }
    } catch (err) {
      console.log("⚠️ JSON parsing failed → using fallback");
      data = fallback(role, topicsToFocus, numberOfQuestions);
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error("🔥 GROQ ERROR:", error.message);

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
    console.error("🔥 GROQ ERROR:", error.message);

    return res.status(200).json({
      title: req.body.question,
      explanation: "Failed to generate explanation",
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
    "What are advantages of",
    "Real-world use of",
    "Common mistakes in",
    "Explain lifecycle of",
    "How to optimize",
    "Advanced concept of"
  ];

  for (let i = 0; i < count; i++) {
    const topic = topicList[i % topicList.length];
    const template = templates[i % templates.length];

    questions.push({
      question: `${template} ${topic} in ${role}?`,
      answer: `${topic} is an important concept in ${role}. It is widely used in real-world applications and helps build scalable systems.`,
    });
  }

  return questions;
};