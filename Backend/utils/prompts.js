// const questionAnswerPoint =(role,experience,topicsToFocus,numberOfQuestions)=>(`
//     You are an AI trained to generate technical interview question and answer.
//     Task:
//     - Role: ${role}
//     - Candidate Experience: ${experience} years
//     - Focus Topics: ${topicsToFocus}
//     - Write ${numberOfQuestions} interview questions.
//     - For each question,generate a detailed but beginner-friendly answer.
//     - If the answer needs a code example, add a small code block inside.
//     - Keep formatting very clean.
//     - Return a pure JSON array like.
//     [
//     {
//     "question": "Question here?",
//     "answer": "Answer here."
//         },
//         ...]
//     Important: Do Not add any extra text. Only return valid JSON
//     `)

//     const conceptExplainPromt =(question)=>(
//         `
//         You are an AI trained to generate explanations for a given interview question.

//         Task:

//         - Explain the followong interview question and its concept in depth as if you're teachning a beginner developer.
//         - Question: "${question}"
//         - After the explanation, provide a short and clear title that summarize the concept for the article page header. 
//         - If the explanation includes a code example, provide a small code block. 
//         - Keep the formatting very clean ans clear. 
//         - Return the result as a valid JSON object in the following format: 
//         {
//            "tittle": "Short title here?",
//            "explanation": "Explanation here"
//                    }


//         Important: Do Not add any extra text outside the JSON format. Only return valid JSON. 

//         `)
//         module.exports = {questionAnswerPoint,conceptExplainPromt};
    
// utils/prompts.js

const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => `
You are an AI trained to generate technical interview question and answer.
Task:
- Role: ${role}
- Candidate Experience: ${experience} years
- Focus Topics: ${topicsToFocus}
- Write ${numberOfQuestions} interview questions.
- For each question, generate a detailed but beginner-friendly answer.
- If the answer needs a code example, add a small code block inside.
- Keep formatting very clean.
- Return a pure JSON array like:
[
    {
        "question": "Question here?",
        "answer": "Answer here."
    }
]
Important: Do not add any extra text. Only return valid JSON
`;

const conceptExplainPrompt = (question) => `
You are an AI trained to generate explanations for a given interview question.
Task:
- Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
- Question: "${question}"
- After the explanation, provide a short and clear title that summarizes the concept for the article page header. 
- If the explanation includes a code example, provide a small code block. 
- Keep the formatting very clean and clear. 
- Return the result as a valid JSON object like:
{
    "title": "Short title here",
    "explanation": "Explanation here"
}
Important: Do not add any extra text outside the JSON format. Only return valid JSON
`;

module.exports = { questionAnswerPrompt, conceptExplainPrompt };
