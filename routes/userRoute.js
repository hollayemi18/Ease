const express = require('express');
const router = express.Router();
const cntrl = require('../controller/userCntrl');

router.post('/register', cntrl.register);
router.get('/token', cntrl.token);
module.exports = router;
