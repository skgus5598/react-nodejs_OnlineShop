const express = require('express');
const router = express.Router();


const {signUp, checkId, login} = require('../controller/userController');

router.get('/user/checkId/:inputId', checkId)
router.post('/user/signUp', signUp);
router.post('/user/login', login);

module.exports = router;