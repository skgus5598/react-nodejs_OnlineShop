const express = require('express');
const router = express.Router();


const {signUp, checkId, login, refreshToken, getUserInfo, updateUser} = require('../controller/userController');

router.get('/user/checkId/:inputId', checkId)
router.post('/user/signUp', signUp);
router.post('/user/login', login);
router.get('/refresh', refreshToken)
router.get('/getUserInfo/:userNo', getUserInfo);
router.put("/updateUser", updateUser)

module.exports = router;