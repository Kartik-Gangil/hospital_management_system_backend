
const { createClient } = require('redis')



const redisClient = createClient(
    { url: process.env.REDIS_URL, }
)
redisClient.connect();
redisClient.on('error', err => console.log('Redis Client Error', err));

const redisSubscriber = createClient({
    url: process.env.REDIS_URL // Redis server URL
});

// Connect to Redis
redisSubscriber.connect()
    .then(() => console.log("Redis subscriber connected"))
    .catch(console.error);


module.exports = {redisClient , redisSubscriber};