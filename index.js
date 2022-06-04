const express = require('express');
const cors = require('cors');
const http = require('http');

const { io, connection } = require("./Connection");

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketIOMiddleware = (req, res, next) => {
    req.io = io;
    next();
}

server.use('/', (req, res) => {
    res.send(connection(io(server)));
})

server.listen(8000, (err) => {
    if (err) console.log(err);
    console.log("Listening on 8000");
})