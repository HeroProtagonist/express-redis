const Debug = require('debug')
const Cache = require('../redis/cache')

const log = Debug('currentTime')
const cache = Cache()

function currentTime (req, res, next) {
  log(`attempting to get current time from cache`)
  return cache.wrap('current-time', () => {
      return calculateCurrentTime()
    })
    .then(currentTime => {
      res.currentTime =  currentTime
      next()
    })
    .catch(e => {
      log('current time cache error: ', e)
      res.currentTime = calculateCurrentTime()
      next()
    })
}

function calculateCurrentTime () {
  return `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
}

module.exports = {
  currentTime
}
