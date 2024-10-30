const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");
const db = require("./db.js");
const commentsRoutes = require("./routes/comments.js");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.use("/api", commentsRoutes);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("sendComment", (newComment) => {
    io.emit("newComment", newComment);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.set("socketio", io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
