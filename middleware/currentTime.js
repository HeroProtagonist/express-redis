const Debug = require('debug')
const Cache = require('../redis/cache')

const log = Debug('currentTime')
const cache = Cache()

function currentTime (req, res, next) {
  return Promise.all([currentTimeCalc(1, res), currentTimeCalc(2, res)])
  .then(() => next())
  .catch(e => next(e))
}

function currentTimeCalc (num, res) {
  log(`attempting to get current time from cache`, num)
  return cache.wrap(`current-time-${num}`, () => {
      return calculateCurrentTime()
    })
    .then(currentTime => {
      res[`currentTime${num}`] =  currentTime
    })
    .catch(e => {
      log('current time cache error: ', e)
      res[`currentTime${num}`] = calculateCurrentTime()
    })
}

function calculateCurrentTime () {
  return `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
}

module.exports = {
  currentTime
}
