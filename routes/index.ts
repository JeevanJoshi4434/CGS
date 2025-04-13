// routes/index.ts
import express from 'express';
import exampleQueue from '../utils/queueService';

const router = express.Router();

router.post('/add-job', async (req, res) => {
  const job = await exampleQueue.add('myJob', { message: 'Hello from BullMQ' });
  res.json({ message: 'Job added', jobId: job.id });
});

export default router;
