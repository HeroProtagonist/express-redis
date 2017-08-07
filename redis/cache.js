const cacheManager = require('cache-manager')
const redisStore = require('cache-manager-redis')

const timeToLive = 20 * 60 // 20min in seconds

const redisCache = cacheManager.caching({
  store: redisStore,
  url: '',
  ttl: timeToLive,
  compress: true,
  retry_strategy: retryStrategy,
  max: 10,
  min: 2
})

module.exports = () => redisCache

function retryStrategy (options) {
  if (options.attempt > 5) {
    // Stop retrying afer 5 attempts.
    return undefined
  }
  console.log('Retry Attempt: ', options.attempt)
  // Increase reconnect delay by 150ms.
  return options.attempt * 150
}
