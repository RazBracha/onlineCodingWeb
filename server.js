


const express = require("express");
const http = require("http");
const cors = require("cors");

const { Server } = require("socket.io");

const connectDB = require('./configs/db');
const codeBlockRouter = require('./routers/codeBlockRouter');
const users = require('./routers/userRouter')

const app = express();
app.use((req, res, next) => {
  if (req.method == "OPTIONS") {
    res.status(200);
    return;
  }
  next();
})
app.use(cors());
app.use((req, res) => {
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Origin', 'https://onlinecodingwebclient-production.up.railway.app');
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE');
});
app.use(express.json())

// routers
app.use('/codeblocks', codeBlockRouter)
app.use('/users', users)

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // origin: "https://online-coding-web-client.vercel.app",
    // origin: "http://localhost:3000", //client
    origin: "https://onlinecodingwebclient-production.up.railway.app",
    credentials: 'same-origin',
    optionSuccessStatus: 200,
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
