const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/demo-forum'


////////// MongoDB Config Section Starts Here //////////
mongoose.connect(
  MONGODB_URI,
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
app.use(routes)

////////// Route Config Section Ends Here //////////


app.listen(PORT, () => {
  console.log(`Express server is listening at 127.0.0.1:${PORT}`)
})