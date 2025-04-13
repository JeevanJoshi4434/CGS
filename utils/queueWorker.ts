import { Worker } from 'bullmq';
import { Redis } from 'ioredis';
import RedisProvider from './redisProvider';

const connection = RedisProvider.getInstance();

const worker = new Worker('exampleQueue', async job => {
  console.log('Processing job:', job.name, job.data);
}, { connection });

worker.on('completed', job => {
  console.log(`Job ${job.id} completed!`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed:`, err.message);
});
