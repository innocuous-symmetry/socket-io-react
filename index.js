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

let players = [];

server.listen(8000, (err) => {
    if (err) console.log(err);
    console.log("Listening on 8000");
    
    io.on('connection', (socket) => {
        if (players.length === 0) players.push(socket.id);

        console.log('new client connected.');
        console.log(`players: ${players}`);
        console.log('');

        socket.emit('connection', players);

        socket.on('disconnect', () => {
            let found = players.indexOf(socket.id);
            players = players.splice(found, 0, '');
            console.log(`player ${socket.id} disconnected`);
            console.log(`players: ${players}`);
            console.log('');
        })
    });
})
