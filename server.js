


const express = require("express");
const http = require("http");
const cors = require("cors");

const { Server } = require("socket.io");

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
  cors: {
    // origin: "https://online-coding-web-client.vercel.app",
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept'],
    transports: ["polling"],
    credentials: true,
  },
});

let userCount = 0;

io.on("connection", (socket) => {

  const user = `${++userCount}`;

  console.log(`User connected: user${user}`);
  socket.emit("user_connected", { user });

  socket.on("join_room", (data) => {
    console.log(`User joined room: ${data}`);
    socket.join(data);

  });

  socket.on("send_message", (data) => {
    console.log(`Received message: ${data.messageText} from user ${data.user}`);
    socket.broadcast.emit("receive_message", { ...data, user });
  });


  socket.on("disconnect", () => {
    console.log(`User disconnected: user${user}`);
  });
});

server.listen(5000, () => {
  console.log("SERVER IS RUNNING");
});
