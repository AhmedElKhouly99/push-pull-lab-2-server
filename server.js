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

let clients = [];

io.on('connection', async(socket) => {
    clients.push(socket.id);
    console.log('a user connected');
    const users = clients.filter((id)=> id !== socket.id);
        console.log(users);
    io.emit('allUsers', users);
    socket.on('msg', (msg)=>{console.log(msg);
        socket.to( msg.id).emit('newMsg', msg.msg);
        
        // socket.broadcast.emit('msgs', msg);
    });


    socket.on("disconnecting", (reason) => {
        clients = clients.filter((id)=> id !== socket.id);
        // clients.map((c)=>{
            io.emit(('allUsers', clients));
        // });
      });

});



server.listen(3020, () => {
    console.log('listening on *:3020');
});
