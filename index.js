const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

server.listen(8000, (err) => {
    if (err) console.log(err);
    console.log("Listening on 8000");
    
    io.on('connection', (socket) => {
        console.log('new client connected.');
        socket.emit('connection', 'data');
    });
})
