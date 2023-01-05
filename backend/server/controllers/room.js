const getRooms = (req, res) => {
    return res.status(200).send([...rooms.values()]);
}

const createNewRoom = (req, res) => {
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
    rooms.set(newRoom.id, newRoom);
    return res.status(200).send(newRoom);
}

const joinRoom = (req, res) => {
    const { player, room } = req.body;
    const isPlayerExist = players.has(player.id);
    if (!isPlayerExist) {
        return res.status(400).send({ msg: 'This player is not exist' });
    }
    const isRoomExist = rooms.has(room.id);
    if (!isRoomExist) {
        return res.status(400).send({ msg: 'This room is not exist' });
    }
    const dbRoom = rooms.get(room.id);
    dbRoom.players.push(player);
    rooms.set(room.id, dbRoom);
    return res.status(200).send(dbRoom);
}

module.exports = {
    getRooms,
    joinRoom,
    createNewRoom
}


