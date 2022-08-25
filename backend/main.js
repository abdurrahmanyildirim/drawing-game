const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
const { Server } = require("socket.io");
const io = new Server(server, { cors: {} });

const uuid = require('uuid');


let corsOpts = {};
app.use(cors(corsOpts));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const users = new Map();
const rooms = new Map();

app.get('/', (req, res) => {
    res.status(200).send('Server Works');
});

app.get('/rooms', (req, res) => {
    res.status(200).send({ payload: [...rooms] });
})

app.post('/create-room', (req, res) => {
    const { hasPassword, password, name } = req.body;
    if (rooms.has(name)) {
        return res.status(404).send({ msg: 'This room name taken.' });
    }
    const newRoom = {
        id: uuid.v4(),
        hasPassword,
        password: password ? password : '',
        name,
        date: new Date()
    };
    rooms.set(name, newRoom);
    res.status(200).send({ payload: newRoom, rooms: [...rooms.values()] });
});

app.post('/login', (req, res) => {
    const { name } = req.body;
    if (users.has(name)) {
        return res.status(404).send({ msg: 'Bu kullanıcı ismi alınmış.' });
    }
    const newUser = {
        id: uuid.v4(),
        name
    }
    users.set(name, newUser);
    res.status(200).send({ payload: newUser });
});

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('drawing', (data) => {
        io.emit('drawing', data);
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