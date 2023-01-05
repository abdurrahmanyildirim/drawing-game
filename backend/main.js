const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
const { Server } = require("socket.io");
const routes = require('./server/routes/index');
const io = new Server(server, { cors: {} });
const { initSocket } = require('./server/socket/index');

initSocket(io);

let corsOpts = {};
app.use(cors(corsOpts));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

server.listen('3000', function () {
    console.log('Listening to : ' + '3000');
});