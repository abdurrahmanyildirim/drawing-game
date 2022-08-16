const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
const { Server } = require("socket.io");
const io = new Server(server, { cors: {} });


let corsOpts = {};
app.use(cors(corsOpts));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', (req, res) => {
    res.status(200).send('Server Works');
});

io.on('connection', (socket) => {
    console.log('user connected');
    // socket.broadcast.
    socket.on('drawing', (data) => {
        io.emit('drawing', data);
        // socket.emit('drawing', data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on("error", (err) => {
        console.log(err);
        if (err && err.message === "unauthorized event") {
            socket.disconnect();
        }
    });
});


server.listen('3000', function () {
    console.log('Listening to : ' + '3000');
});