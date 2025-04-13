import { Queue } from 'bullmq';
import { Redis } from 'ioredis';
import RedisProvider from './redisProvider';

const connection = RedisProvider.getInstance();

const exampleQueue = new Queue('exampleQueue', { connection });

export default exampleQueue;

export {
    connection as redis,
};