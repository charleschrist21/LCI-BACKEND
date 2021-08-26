const express = require('express')
const router = express.Router()
const login = require('../Controller/loginController')

router.post('/',login.login);
router.get('/check', login.check)



module.exports 			= router;