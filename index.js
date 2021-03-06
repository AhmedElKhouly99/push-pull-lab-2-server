const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

app.get('/', (req, res) => {
    res.send("hellow");
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('msg', (msg)=>{
        console.log(msg);
        socket.broadcast.emit('msgs', msg);
    });
});

server.listen(3010, () => {
    console.log('listening on *:3010');
});
