const express = require('express')
const morgan = require('morgan')
const app = express()

const {
  cachePage,
  renderIfCached,
} = require('./middleware/page-caching')

const { render } = require('./middleware/render')

app.use(morgan('tiny'))
app.set('view engine', 'pug')

app.get('*', renderIfCached)

app.use(render)

app.get('*', cachePage)

app.use((req, res) => {
  res.render(res.html)
})
// app.get('/', (req, res) => {})

app.listen(3000, () => {
  console.log('Server listening on port 3000...')
})
