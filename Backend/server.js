// require("dotenv").config();
// const express=require("express");
// const cors=require("cors");
// const path=require("path");
// const authRoutes = require("./routes/authRoutes");  
// const sessionRoutes=require('./routes/sessionRoutes')
// const questionRoutes=require('./routes/questionRoutes')
// const connectDB = require("./config/db.js");
// const {protect} = require("./middlewares/authMiddleware.js")
// const {generateInterviewQuestion,generateConceptExplanation}=require("./controllers/aiController.js")
// const app=express();

// app.use(
//     cors({
//         origin: "#",
//         methods:["GET","POST","PUT","DELETE"],
//         allowedHeaders:["Content-type","Autjorization"],
//     })
// );

// connectDB()

// app.use(express.json());





// // Routes
// app.use("/api/auth",authRoutes);
// app.use("/api/sessions",sessionRoutes);
// app.use("/api/question",questionRoutes);

// // app.use("/api/ai/generate-question",protect,generateInterviewQuestion);
// // app.use("/api/ai/generate-explanation",protect,generateConceptExplanation)
// app.post("/api/ai/generate-question", protect, generateInterviewQuestion);
// app.post("/api/ai/generate-explanation", protect, generateConceptExplanation);

// //Serve uploads folder 
// app.use("/uploads",express.static(path.join(__dirname,"uploads"),{}));



// const PORT=process.env.PORT || 5000;
// app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));

// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const path = require("path");
// const authRoutes = require("./routes/authRoutes");  
// const sessionRoutes = require('./routes/sessionRoutes');
// const questionRoutes = require('./routes/questionRoutes');
// const connectDB = require("./config/db.js");
// const { protect } = require("./middlewares/authMiddleware.js");
// const { generateInterviewQuestion, generateConceptExplanation } = require("./controllers/aiController.js");

// const app = express();

// // Middleware
// app.use(express.json()); // must be before routes
// app.use(
//     cors({
//         origin: "*", // replace with frontend URL
//         methods: ["GET","POST","PUT","DELETE"],
//         allowedHeaders: ["Content-Type","Authorization"],
//     })
// );

// // Connect Database
// connectDB();

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/sessions", sessionRoutes);
// app.use("/api/question", questionRoutes);

// // AI Routes (protected)
// app.post("/api/ai/generate-question", protect, generateInterviewQuestion);
// app.post("/api/ai/generate-explanation", protect, generateConceptExplanation);

// // Serve uploads folder
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db.js");

// Routes
const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const questionRoutes = require("./routes/questionRoutes");
const { protect } = require("./middlewares/authMiddleware.js");
const { generateInterviewQuestion, generateConceptExplanation } = require("./controllers/aiController.js");

const app = express();

// Middleware
app.use(express.json()); // MUST be before routes
app.use(
  cors({
    origin: "*", // replace with frontend URL if needed
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Connect Database
connectDB();

// Routes
//app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/question", questionRoutes);

// AI Routes (protected)
app.post("/api/ai/generate-question", protect, generateInterviewQuestion);
app.post("/api/ai/generate-explanation", protect, generateConceptExplanation);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test route to check req.body parsing
app.post("/test-body", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
