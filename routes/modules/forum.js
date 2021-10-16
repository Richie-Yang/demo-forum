const express = require('express')
const router = express.Router()

const Forum = require('../../models/forum')
const regexModule = require('../../regexModule')


// get comment page
router.get('/comment', (req, res) => {
  return res.render('comment')
})

// post comment page (SQL create operation)
router.post('/comment', (req, res) => {
  const { title, comment } = req.body
  return Forum.create({ title, comment })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// get detail page
router.get('/:id/detail', (req, res) => {
  const id = req.params.id
  return Forum.findById(id)
    .lean()
    .then(comment => res.render('detail', { comment }))
    .catch(error => console.log(error))
})

// post detail page (SQL update operation)
router.post('/:id/detail', (req, res) => {
  const id = req.params.id
  const { title, comment } = req.body
  return Forum.findById(id)
    .then(forumComment => {
      forumComment.title = title
      forumComment.comment = comment
      return forumComment.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// post detail page (SQL delete operation)
router.post('/:id/delete', (req, res) => {
  const id = req.params.id
  return Forum.findById(id)
    .then(comment => comment.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// search action
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  let result

  Forum.find()
    .lean()
    .then(comments => {
      result = comments.filter(comment => {
        return comment.title.trim().toLowerCase().includes(keyword.toLowerCase())
      })
    })
    .then(() => {
      regexModule(result)
      res.render('index', { comments: result })
    })
    .catch(error => console.log(error))
})


module.exports = router
