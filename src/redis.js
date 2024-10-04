import { createClient } from 'redis';

const client = createClient();

client.on('error', (error) => console.log('RedisClient Error', error));

await client.connect();
