// connect to redis
const redis = require('redis');

// const redisClient = redis.createClient(6379);
const redisClient = redis.createClient(10084, 'redis-10084.c1.asia-northeast1-1.gce.cloud.redislabs.com', {no_ready_check: true});
redisClient.auth('EKAIU5LlwVXZrTEG8TrX7NID8BtenArA');

redisClient.on('connect', function () {
    console.log('redis client connected');
});

module.exports = redisClient;