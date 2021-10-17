const db = require('../../config/mongoose')
const Forum = require('../forum')
const dummyData = require('./forumData')


db.once('open', () => {
  console.log('mongodb connected')

  dummyData.results.forEach(({ title, image, comment}) => {
    Forum.create({ title, image, comment})
  })

  console.log('done')
})