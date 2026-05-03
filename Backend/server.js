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
const atsRoutes = require("./routes/atsRoutes");

const {
  evaluateAnswer,
  generateInterviewQuestion,
  generateConceptExplanation,
} = require("./controllers/aiController");

const { protect } = require("./middlewares/authMiddleware.js");

const app = express();


// ======================================================
// CREATE HTTP SERVER
// ======================================================
const server = http.createServer(app);


// ======================================================
// SOCKET.IO
// ======================================================
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


// ======================================================
// SOCKET EVENTS
// ======================================================
io.on("connection", (socket) => {

  console.log("User connected:", socket.id);

  // =========================
  // JOIN ROOM
  // =========================
  socket.on("join-room", (roomId) => {

    socket.join(roomId);

    // EXISTING USERS
    const users = Array.from(
      io.sockets.adapter.rooms.get(roomId) || []
    ).filter((id) => id !== socket.id);

    // SEND EXISTING USERS
    socket.emit("all-users", users);

    // NOTIFY OTHERS
    socket.to(roomId).emit("user-joined", socket.id);

    console.log(
      `Socket ${socket.id} joined room ${roomId}`
    );
  });

  // =========================
  // OFFER
  // =========================
  socket.on("offer", ({ offer, to }) => {

    io.to(to).emit("offer", {
      offer,
      from: socket.id,
    });
  });

  // =========================
  // ANSWER
  // =========================
  socket.on("answer", ({ answer, to }) => {

    io.to(to).emit("answer", {
      answer,
      from: socket.id,
    });
  });

  // =========================
  // ICE CANDIDATE
  // =========================
  socket.on("ice-candidate", ({ candidate, to }) => {

    io.to(to).emit("ice-candidate", {
      candidate,
      from: socket.id,
    });
  });

  // =========================
  // DISCONNECT
  // =========================
  socket.on("disconnect", () => {

    console.log(
      "User disconnected:",
      socket.id
    );
  });
});


// ======================================================
// MIDDLEWARE
// ======================================================
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);


// ======================================================
// DATABASE
// ======================================================
connectDB();


// ======================================================
// ROUTES
// ======================================================
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/ats", atsRoutes);


// ======================================================
// AI ROUTES
// ======================================================
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

app.post(
  "/api/ai/evaluate",
  evaluateAnswer
);


// ======================================================
// STATIC UPLOADS
// ======================================================
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);


// ======================================================
// TEST ROUTE
// ======================================================
app.post("/test-body", (req, res) => {

  console.log(req.body);

  res.json(req.body);
});


// ======================================================
// START SERVER
// ======================================================
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {

  console.log(
    `🚀 Server running on port ${PORT}`
  );
});