const Question=require("../models/Question");
const Session=require("../models/Session");




exports.addQuestionsToSession=async(req,res)=>{
    try{
   const {sessionId,questions:questions}=req.body;

   if(!sessionId || !questions|| !Array.isArray(questions)){
    return res.status(400).json({message: "invalid inpute data"})
   }
   const session =await Session.findById(sessionId);
   if(!session){
    return res.status(404).json({mession : "Session not found"});
   }

   const createdQuestions = await Question.insertMany(
       questions.map((q)=>({
        session:sessionId,
        question:q.question,
        answer:q.answer,
       }))
    );
    }catch(errror){
      res.status(500).json({message:"Server Error"});
    }
};

exports.togglePinQuestion=async(req,res)=>{
    try{
       const question = await Question.findById(req.params.id);
       if(!question){
        return res
        .status(404)
        .json({success: flase,message:"Question not found"})
       }
       Question.isPinned=!question.isPinned
       await question.save();

       res.status(200).json({success: true,question})
    }catch(error){
     res.status(500).json({message:"Server Error"});
    }
}

// exports.updateQuestionNote=async(req,res)=>{
//      try{
//         const {note}=req.body;
//         const question = await Question.findById(req.params.id);

//         if(!question){
//             return res.status(400)
//             .json({success: false,message: "Question not found"})
//         }
//         question.note=note || "";
//         await question.save();

//         res.status(200).json({success: true,question});
//     }catch(error){
//      res.status(500).json({message:"Server Error"});
//     }
// }
exports.updateQuestionNote = async (req, res) => {
  try {
    const { note } = req.body || {};

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

    res.status(200).json({ success: true, question });
  } catch (error) {
    console.error("updateQuestionNote error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
