const { createNewRoom, getRooms, joinRoom } = require('../controllers/room');
const { Router } = require('express');
const router = Router();

router.get('/', getRooms);
router.post('/create', createNewRoom);
router.post('/join', joinRoom);

module.exports = router;

