const express = require('express')
const router = express.Router()

const Forum = require('../../models/forum')
const regexModule = require('../../regexModule')

// get index page
router.get('/', (req, res) => {
  Forum.find()
    .lean()
    .then(comments => {
      regexModule(comments)
      res.render('index', { comments })
    })
    .catch(error => console.log(error))
})


module.exports = router
