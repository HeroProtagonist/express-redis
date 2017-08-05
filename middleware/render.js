const pug = require('pug')
const path = require('path')

function render (req, res, next) {
  res.html = pug.renderFile(path.join(__dirname, '..', 'views/index.pug'), {
    timestamp: res.currentTime
    // timestamp: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
  })
  next()
}

module.exports = {
  render,
}
