const express = require('express');
const router = express.Router();


const {signUp, checkId} = require('../controller/userController');

router.get('/user/checkId/:inputId', checkId)
router.post('/user/insertUser', signUp);


module.exports = router;