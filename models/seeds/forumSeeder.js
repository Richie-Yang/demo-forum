const mongoose = require('mongoose')
const forum = require('../forum')
const Forum = require('../forum')
const dummyData = require('./forumData')

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

  dummyData.results.forEach(({ title, image, comment}) => {
    forum.create({ title, image, comment})
  })

  console.log('done')
})