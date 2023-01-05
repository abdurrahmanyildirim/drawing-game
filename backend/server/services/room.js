const uuid = require('uuid');

const rooms = new Map();

const createNewRoom = ({ name, password, owner, hasPassword }) => {
    const newRoom = {
        id: uuid.v4(),
        hasPassword,
        password: hasPassword ? password : '',
        name,
        date: new Date(),
        owner,
        players: [owner]
    };
    rooms.set(newRoom.id, newRoom);
    return newRoom;
}

