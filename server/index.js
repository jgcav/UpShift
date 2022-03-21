const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`user disconnected ${socket.id}`);
  });
});

server.listen(4000, () => {
  console.log("listening on *:4000");
});
