const mongoose = require('mongoose')
const Forum = require('../forum')

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

  for (let i = 0; i <= 10; i++) {
    Forum.create({
      title: `title-${i}`,
      comment: `comment-${i}`
    })
  }

  console.log('done')
})