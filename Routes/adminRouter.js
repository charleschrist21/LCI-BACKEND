const express = require('express')
const router = express.Router()
const check = require('./tokenChecker')
const admin = require('../Controller/adminController')

router.get('/', check, admin.gets)
router.get('/:id',check, admin.get)
router.post('/',check, admin.store)
router.put('/:id',check, admin.update)
router.delete('/:id',check, admin.delete)


module.exports          = router;