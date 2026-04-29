


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db.js");

// Routes
const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const questionRoutes = require("./routes/questionRoutes");
const { evaluateAnswer } = require("./controllers/aiController");
const atsRoutes = require("./routes/atsRoutes");

const { protect } = require("./middlewares/authMiddleware.js");
const {
  generateInterviewQuestion,
  generateConceptExplanation,
} = require("./controllers/aiController.js");

const app = express();

// 🔥 CREATE HTTP SERVER (IMPORTANT)
const server = http.createServer(app);

// 🔥 SOCKET.IO SETUP
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// 🔥 SOCKET EVENTS (VIDEO CALL SIGNALING)
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join room
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-joined", socket.id);
  });

  // WebRTC offer
  socket.on("offer", ({ offer, to }) => {
    io.to(to).emit("offer", {
      offer,
      from: socket.id,
    });
  });

  // WebRTC answer
  socket.on("answer", ({ answer, to }) => {
    io.to(to).emit("answer", {
      answer,
      from: socket.id,
    });
  });

  // ICE candidates
  socket.on("ice-candidate", ({ candidate, to }) => {
    io.to(to).emit("ice-candidate", {
      candidate,
      from: socket.id,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// 🔧 Middleware
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 🔗 Connect DB
connectDB();

// 📌 Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/ats", atsRoutes);

// 🤖 AI Routes
app.post(
  "/api/ai/generate-question",
  protect,
  generateInterviewQuestion
);
app.post(
  "/api/ai/generate-explanation",
  protect,
  generateConceptExplanation
);

app.post("/api/ai/evaluate", evaluateAnswer);

// 📁 Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🧪 Test route
app.post("/test-body", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

// 🚀 START SERVER (IMPORTANT: server.listen)
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});