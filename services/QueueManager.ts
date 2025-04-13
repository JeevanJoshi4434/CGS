import { Queue, Job } from 'bullmq';
import { Redis } from 'ioredis';
import RedisProvider from '../utils/redisProvider';

export class QueueManager {
    private static queues: Map<string, Queue> = new Map();
    private static redis: Redis = RedisProvider.getInstance();

    protected static async lookupQueue(queueName: string): Promise<Queue | null> {
        // First check in memory
        const existingQueue = this.queues.get(queueName);
        if (existingQueue) return existingQueue;

        // Check in Redis
        const exists = await this.redis.exists(`bull:${queueName}:meta`);
        if (exists) {
            const queue = this.createQueue(queueName);
            return queue;
        }

        return null;
    }

    protected static createQueue(queueName: string): Queue {
        const queue = new Queue(queueName, {
            connection: {
                host: process.env.REDIS_HOST,
                port: parseInt(process.env.REDIS_PORT as string)
            }
        });
        this.queues.set(queueName, queue);
        return queue;
    }

    public static async getOrCreateQueue(queueName: string): Promise<Queue> {
        const queue = await this.lookupQueue(queueName);
        if (queue) return queue;
        return this.createQueue(queueName);
    }

    public static async addJob<T>(queueName: string, data: T): Promise<Job<T>> {
        // Check if the queue name follows the contest-{id}-queue pattern
        if (queueName.startsWith('contest-') && queueName.endsWith('-queue')) {
            // First check if the queue exists in memory
            let queue = this.queues.get(queueName);

            if (!queue) {
                // Check if the queue exists in Redis
                const exists = await this.redis.exists(`bull:${queueName}:meta`);
                if (exists) {
                    // If it exists in Redis, create it and add to our Map
                    queue = this.createQueue(queueName);
                } else {
                    // If it doesn't exist anywhere, create a new queue
                    queue = this.createQueue(queueName);
                }
            }

            return queue.add(queueName, data);
        }

        // For non-contest queues, use the original implementation
        const queue = await this.getOrCreateQueue(queueName);
        return queue.add(queueName, data);
    }

    public static async getJobStatus(queueName: string, jobId: string): Promise<string | null> {
        const queue = await this.lookupQueue(queueName);
        if (!queue) return null;

        const job = await queue.getJob(jobId);
        return job ? await job.getState() : null;
    }

    public static async updateJobStatus(queueName: string, jobId: string, status: string): Promise<boolean> {
        const queue = await this.lookupQueue(queueName);
        if (!queue) return false;

        const job = await queue.getJob(jobId);
        if (!job) return false;

        await job.updateProgress(status);
        return true;
    }
}