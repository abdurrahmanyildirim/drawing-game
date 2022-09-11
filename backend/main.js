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

const players = new Map();
const rooms = new Map();
const sockets = new Map();

app.get('/', (req, res) => {
    res.status(200).send('Server Works');
});

app.get('/rooms', (req, res) => {
    res.status(200).send([...rooms.values()]);
})

app.post('/create-room', (req, res) => {
    const { hasPassword, password, name, owner } = req.body;
    if (rooms.has(name)) {
        return res.status(404).send({ msg: 'This room name taken.' });
    }
    const newRoom = {
        id: uuid.v4(),
        hasPassword,
        password: password ? password : '',
        name,
        date: new Date(),
        owner,
        players: [owner]
    };
    rooms.set(name, newRoom);
    res.status(200).send(newRoom);
});

app.post('/join-room', (req, res) => {
    const { player, room } = req.body;
    const isPlayerExist = players.has(player.name);
    if (!isPlayerExist) {
        return res.status(400).send({ msg: 'This player is not exist' });
    }
    const isRoomExist = rooms.has(room.name);
    if (!isRoomExist) {
        return res.status(400).send({ msg: 'This room is not exist' });
    }
    const dbRoom = rooms.get(room.name);
    dbRoom.players.push(player);
    rooms.set(room.name, dbRoom);
    return res.status(200).send(dbRoom);
})

app.post('/login', (req, res) => {
    const { name } = req.body;
    if (players.has(name)) {
        return res.status(404).send({ msg: 'Bu kullanıcı ismi alınmış.' });
    }
    const newPlayer = {
        id: uuid.v4(),
        name,
        point: 0,
        didDraw: false
    }
    players.set(name, newPlayer);
    res.status(200).send(newPlayer);
});

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('drawing', (data) => {
        io.emit('drawing', data);
    });

    socket.on('joinRoom', (room) => {
        socket.join(room.id);
    });

    socket.on('message', (msg, room) => {
        io.to(room.id).emit('message', msg);
    })

    // socket.on('leaveRoom', (room) => {
    //     socket.leave(room.id);
    // });

    socket.on('updateRoom', (room) => {
        io.to(room.id).emit('updateRoom', room);
    });

    socket.on('updateGame', (game, room) => {
        io.to(room.id).emit('updateGame', game);
    });

    socket.on('newRoom', (room) => {
        socket.join(room.id);
        io.emit('newRoom', [...rooms.values()])
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

const heartBeat = (socket) => {

}


server.listen('3000', function () {
    console.log('Listening to : ' + '3000');
});