const express = require('express');
const { refreshToken}  = require('../controllers/refreshToken');
const { getUser, Register, Login, Logout } = require('../controllers/userController');
const { verifyRegister } = require('../middleware/verifyRegister');
const { verifyToken } = require('../middleware/verifyToken');

const router = express.Router();

router.get('/user', verifyToken, getUser);
router.post('/user', verifyRegister, Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

module.exports = router;