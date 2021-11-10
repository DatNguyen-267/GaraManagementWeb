// SETTING PROJECT

const path = require('path')
const express = require('express')
const methodOverride = require('method-override')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const app = express()
const port = 8080
const route = require('./routes')
const db = require('./config/db')

// Connect DB
db.connect();

app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname, 'public')))
// HTTP logger
app.use(express.urlencoded({
    extended:true
}))
app.use(express.json())
app.use(morgan('combined'))


// Template engine
app.engine('hbs', handlebars({
  extname:'.hbs',
  helpers: {
    sum: (a,b) => a + b,
  }

}));
app.set("view engine", 'hbs')
app.set('views', path.join(__dirname, 'resources','views'))

// ROUTE INIT
route(app)


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})