import Redis from 'ioredis';

const redisClient = new Redis({});

redisClient.on('connect', () => {
  console.log('Redis connect');
});

redisClient.on('error', (err) => {
  console.error('Redis error: ', err);
});

export default redisClient;
