import { Worker, Job } from 'bullmq';
import RedisProvider from '../utils/redisProvider';

interface ContestSubmission {
    contestId: string;
    userId: string;
    submissionData: any;
    timestamp: Date;
}

export class ContestWorker {
    private static workers: Map<string, Worker> = new Map();

    public static createWorker(contestId: string): Worker {
        const queueName = `contest_${contestId}_queue`;

        if (this.workers.has(queueName)) {
            return this.workers.get(queueName)!;
        }

        const worker = new Worker(queueName,
            async (job: Job<ContestSubmission>) => {
                // Process the submission
                const { contestId, userId, submissionData } = job.data;

                // Add your contest submission processing logic here
                // For example:
                // await processSubmission(contestId, userId, submissionData);

                return { processed: true };
            },
            {
                connection: RedisProvider.getInstance()
            }
        );

        worker.on('completed', (job) => {
            console.log(`Job ${job.id} completed for contest ${contestId}`);
        });

        worker.on('failed', (job, err) => {
            console.error(`Job ${job?.id} failed for contest ${contestId}:`, err);
        });

        this.workers.set(queueName, worker);
        return worker;
    }
}