// // const express = require('express');
// // // const socketIO = require('socket.io');
// // const cors = require('cors');
// // const connectDB = require('./configs/db');

// // const codeBlockRouter = require('./routers/codeBlockRouter');

// // const server = express();
// // // const io = socketIO(server);
// // const PORT = process.env.PORT || 5000;

// // connectDB();

// // server.use(cors());

// // server.use(express.json());

// // // routers
// // server.use('/codeblocks', codeBlockRouter);


// // server.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });




// /**Web socket connection */

// // io.on('connection', (socket) => {
// //     console.log('A user connected');
  
// //     // Handle code block changes
// //     socket.on('codeChange', (data) => {
// //       // Broadcast the code change to all connected clients
// //       io.emit('codeChange', data);
// //     });
  
// //     socket.on('disconnect', () => {
// //       console.log('A user disconnected');
// //     });
// //   });





// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");

// const cors = require("cors");
// const connectDB = require('./configs/db');
// const codeBlockRouter = require('./routers/codeBlockRouter');

// const app = express();

// app.use(cors());
// app.use(express.json())

// // routers
// app.use('/codeblocks', codeBlockRouter)

// connectDB();

// const server = http.createServer(app);


// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",//client
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {

//   socket.on("join_room", (data) => {
//     socket.join(data);
//   });

//   socket.on("send_message", (data) => {
//     console.log(data)
//     socket.broadcast.emit("receive_message", data);
//   });
// });



// server.listen(5000, () => {
//   console.log("SERVER IS RUNNING");
// });


const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const cors = require("cors");
const connectDB = require('./configs/db');
const codeBlockRouter = require('./routers/codeBlockRouter');
const users=require('./routers/userRouter')

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
    origin: "http://localhost:3000",//client
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
