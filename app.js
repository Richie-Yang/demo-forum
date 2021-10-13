const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Forum = require('./models/forum')

const app = express()
const port = 3000


////////// MongoDB Config Section Starts Here //////////
mongoose.connect(
  'mongodb://localhost/demo-forum',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})
////////// MongoDB Config Section Ends Here //////////


////////// Engine Config Section Starts Here //////////
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
////////// Engine Config Section Ends Here //////////


////////// Route Config Section Starts Here //////////
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

// get index page
app.get('/', (req, res) => {
  Forum.find()
      .lean()
      .then(comments => {
        comments.forEach((comment, index, array) => {
          const commentRegex = /(.{1,20})/
          const commentResult = commentRegex.exec(comment.comment)[1]
          array[index]['brief_comment'] = `${commentResult}......`

          const timeRegex = /(\w{1,5}\s\w{1,5}\s\d{2}\s\d{4}\s\d{2}\:\d{2}\:\d{2})/
          const timeResult = timeRegex.exec(comment.created_at)[1]
          array[index]['brief_updated_at'] = timeResult
        })

        res.render('index', { comments })
      })
      .catch(error => console.log(error))
})

// get comment page
app.get('/forum/comment', (req, res) => {
  return res.render('comment')
})

// post comment page (SQL create operation)
app.post('/forum/comment', (req, res) => {
  const { title, comment } = req.body
  return Forum.create({ title, comment })
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
})

// get detail page
app.get('/forum/:id/detail', (req, res) => {
  const id = req.params.id
  return Forum.findById(id)
      .lean()
      .then(comment => res.render('detail', { comment }))
      .catch(error => console.log(error))
})

// post detail page (SQL update operation)
app.post('/forum/:id/detail', (req, res) => {
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
app.post('/forum/:id/delete', (req, res) => {
  const id = req.params.id
  return Forum.findById(id)
    .then(comment => comment.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

////////// Route Config Section Ends Here //////////


app.listen(port, () => {
  console.log(`Express server is listening at 127.0.0.1:${port}`)
})