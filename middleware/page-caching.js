const Debug = require('debug')
const Cache = require('../redis/cache')

const log = Debug('pageCaching')
const cache = Cache()

module.exports = {
  cachePage: (req, res, next) => {
    if (process.env.NO_CACHE) return next()

    try {
      const cacheKey = req.originalUrl
      log(`caching page for key: ${cacheKey}`)

      cache.set(cacheKey, res.html, err => {
        err ? next(err) : next()
      })
    } catch (e) {
      console.warn(e)
      next()
    }
  },

  renderIfCached: (req, res, next) => {
    if (process.env.NO_CACHE) return next()

    const cacheKey = req.originalUrl
    log(`checking page cache for key: ${cacheKey}`)

    try {
      cache.get(cacheKey, (err, html) => {
        // html is null if not found in cache

        if (err) {
          // log error but continue request normally
          log(`redis error fetching cached page: ${err}`)
          return next()
        } else if (html === null) {
          log(`cache miss, continuing with request: ${req.originalUrl}`)
          return next()
        } else {
          log(`rendering cached page: ${req.originalUrl}`)
          res.send(html)
        }
      })
    } catch (e) {
      console.warn(e)
      next()
    }
  }
}
