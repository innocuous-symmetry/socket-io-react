const socketIO = require('socket.io');

const io = (server) => {
    return socketIO(server, {
        cors: {
            origin: "http://localhost:3000"
        }
    });
}

const connection = (io) => {
    io.on('connection', (socket) => {
        console.log(`User ${socket.id} connected`);

        socket.on('disconnect', () => {
            console.log(`User ${socket.id} disconnected`)
        })
    })
}

module.exports = { io, connection }