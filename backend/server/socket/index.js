
const initSocket = (io) => {
    // io = new Server(server, { cors: {} });
    io.on('connection', (socket) => {
        socket.on('drawing', (data) => {
            io.emit('drawing', data);
        });

        socket.on('joinRoom', (room, player) => {
            socket.playerId = player.id
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
            socket.roomId = room.id;
            io.emit('newRoom', [...rooms.values()])
        });

        socket.on('disconnect', () => {
            // console.log('playerId : ', socket.playerId);
            // console.log('roomId : ', socket.roomId);
            console.log('user disconnected');
        });

        socket.on("error", (err) => {
            console.log(err);
            if (err && err.message === "unauthorized event") {
                socket.disconnect();
            }
        });
    });
}




module.exports = {
    initSocket
}
