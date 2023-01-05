const { Router } = require('express');
const router = Router();

const player = require('./player');
const room = require('./room');

router.use('/player', player);
router.use('/room', room);


module.exports = router;
