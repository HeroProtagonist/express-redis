const redisUrl = require('redis-url')
const debug = require('debug')
const client = redisUrl.connect('')

const log = debug('clearCache')

client.on('connect', () => {
  log('Connected to Redis Database')
  log('Deleting all data from Redis DB…')

  client.flushdb((err, res) => {
    // if (err) throw err // TODO: Fix
    if (err) log(err)

    log(`DB flushed (${res}). Bye!`)

    client.quit()
  })
})

// client.on('Error', err => { // TODO: Fix
client.on('error', err => {
  console.warn('Error connecting to Redis Database', err)
})
