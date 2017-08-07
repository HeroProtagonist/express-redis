const pug = require('pug')
const path = require('path')

function render (req, res, next) {
  res.html = pug.renderFile(path.join(__dirname, '..', 'views/index.pug'), {
    timestamp1: res.currentTime1,
    timestamp2: res.currentTime2
  })
  next()
}

module.exports = {
  render,
}
