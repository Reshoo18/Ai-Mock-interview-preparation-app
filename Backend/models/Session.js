// const mongoose=require("mongoose")
// const sessionSchema=new mongoose.Schema({
//     user:{type:mongoose.Schema.Types.ObjectId,
//         ref:"User"
//     },
//     role:{
//         type:String,
//         require:true
//     },
//     experience:{
//         type:String,
//         require:true
//     },
//     topicsToFocus:{
//         type:String,
//          require:true
//     },
//     description:String,
//     questions:[{type:mongoose.Schema.Types.ObjectId,
//         ref:"Question"
//     }],
//      questions: [
//       { type: mongoose.Schema.Types.ObjectId, ref: "Question" }
//     ],
// },{timestamps:true})


// module.exports=mongoose.model("Session",sessionSchema)

const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    // ✅ correct name
    topicsToFocus: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    // ✅ ONLY this (remove `question`)
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);
