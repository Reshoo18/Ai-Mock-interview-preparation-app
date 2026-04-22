const questionAnswerPrompt = (
  role,
  experience,
  topicsToFocus,
  numberOfQuestions
) => `
Generate ${numberOfQuestions} technical interview questions and answers.

Role: ${role}
Experience: ${experience} years
Topics: ${topicsToFocus}

Rules:
- Keep answers simple and clear
- Include small code examples if needed
- Do NOT add explanation outside JSON

Return ONLY this format:
[
  {
    "question": "Your question",
    "answer": "Your answer"
  }
]
`;

const conceptExplainPrompt = (question) => `
Explain this interview question clearly:

${question}

Rules:
- Beginner friendly explanation
- Include example if needed
- Keep clean formatting

Return JSON:
{
  "title": "Short title",
  "explanation": "Full explanation"
}
`;

module.exports = {
  questionAnswerPrompt,
  conceptExplainPrompt,
};