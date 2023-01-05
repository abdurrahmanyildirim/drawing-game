const login = (req, res) => {
    const { name } = req.body;
    // if (players.has(name)) {
    //     return res.status(404).send({ msg: 'Bu kullanıcı ismi alınmış.' });
    // }
    const newPlayer = {
        id: uuid.v4(),
        name,
        point: 0,
        didDraw: false
    }
    players.set(newPlayer.id, newPlayer);
    res.status(200).send(newPlayer);
};

module.exports = {
    login
}
