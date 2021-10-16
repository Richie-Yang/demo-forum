const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const forum = require('./modules/forum')


router.use('/', home)
router.use('/forum', forum)


module.exports = router