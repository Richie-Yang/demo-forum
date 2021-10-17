const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 3000

require('./config/mongoose')
const routes = require('./routes')


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