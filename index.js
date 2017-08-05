const express = require('express')
const morgan = require('morgan')
const app = express()

const {
  cachePage,
  renderIfCached,
} = require('./middleware/page-caching')

const { render } = require('./middleware/render')
const { currentTime } = require('./middleware/currentTime')

app.use(morgan('tiny'))
// app.set('view engine', 'pug')

app.get('*', renderIfCached)

app.use(currentTime)
app.use(render)

app.get('*', cachePage)

app.use((req, res) => {
  res.send(res.html)
})
// app.get('/', (req, res) => {})

app.listen(3000, () => {
  console.log('Server listening on port 3000...')
})
