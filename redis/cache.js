const cacheManager = require('cache-manager')
const redisStore = require('cache-manager-redis')

const timeToLive = 20 * 60 // 20min in seconds

export const redisCache = cacheManager.caching({
  store: redisStore,
  url: '',
  ttl: timeToLive,
  compress: true,
  retry_strategy: retryStrategy,
})

module.exports = function () {
  let cache = memoryCache

  if (process.env.NODE_ENV !== 'test') {
    cache = redisCache
  }

  return cache
}

function retryStrategy (options) {
  console.log('ATTEMPT: ', options.attempt)
  if (options.attempt > 5) {
    // Stop retrying afer 10 attempts.
    return undefined
  }
  // Increase reconnect delay by 150ms.
  return options.attempt * 150
}
