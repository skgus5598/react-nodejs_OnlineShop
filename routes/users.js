const express = require('express');
const router = express.Router();


const {signUp, checkId, login, refreshToken, getUserInfo} = require('../controller/userController');

router.get('/user/checkId/:inputId', checkId)
router.post('/user/signUp', signUp);
router.post('/user/login', login);
router.get('/refresh', refreshToken)
router.get('/getUserInfo/:userNo', getUserInfo)
module.exports = router;