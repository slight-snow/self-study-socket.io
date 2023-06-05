const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }
});

// GET CONNECT FROM IO
io.on('connection', (socket) => {
  // USER CONNECTED
  console.log(`USER CONNECTED: ${socket.id}`);

  // USER DISCONNECTED
  socket.on('disconnect', () => {
    console.log(`USER DISCONNECTED: ${socket.id}`)
  })

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`)
  })

  socket.on('send_message', (data) => {
    console.log(data);
    socket.to(data.room).emit('receive_message', data);
    // socket.broadcast.emit('receive_message', data);
  })
})

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
})