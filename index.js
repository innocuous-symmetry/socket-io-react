const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

const http = require('http');
const server = http.createServer(app);

const socketIO = require('socket.io');

const io = socketIO(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

io.on('connection', (socket) => {
    console.log('client connected: ' + socket.id);
});

app.use('/', (req, res) => {
    
})

app.listen(8000, (err) => {
    if (err) console.log(err);
    console.log("Listening on 8000");
})