


const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const cors = require("cors");
const connectDB = require('./configs/db');
const codeBlockRouter = require('./routers/codeBlockRouter');
const users = require('./routers/userRouter')

const app = express();

app.use(cors());
app.use(express.json())

// routers
app.use('/codeblocks', codeBlockRouter)
app.use('/users', users)

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  transports: ["websocket"],
  cors: {
    origin: "https://online-coding-web-client.vercel.app",//client
    methods: ["GET", "POST"],
  },
});

let userCount = 0;

io.on("connection", (socket) => {

  const user = `${++userCount}`;

  console.log(`User connected: user${user}`);
  socket.emit("user_connected", { user });

  socket.on("join_room", (data) => {
    socket.join(data);

  });

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", { ...data, user });
  });


  socket.on("disconnect", () => {
    console.log(`User disconnected: user${user}`);
  });
});

server.listen(5000, () => {
  console.log("SERVER IS RUNNING");
});
