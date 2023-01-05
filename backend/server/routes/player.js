const { login } = require('../controllers/player');
const { Router } = require('express');
const router = Router();

router.post('/login', login);

module.exports = router;



