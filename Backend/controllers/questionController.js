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

    }catch(error){
     res.status(500).json({message:"Server Error"});
    }
}

exports.updateQuestionNote=async(req,res)=>{
     try{

    }catch(error){
     res.status(500).json({message:"Server Error"});
    }
}