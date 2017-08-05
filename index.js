const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('tiny'))
app.set("view engine", "pug")

app.get('/', function (req, res) {
  res.render('index', {
    timestamp: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
