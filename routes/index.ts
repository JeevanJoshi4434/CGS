// routes/index.ts
import express from 'express'; 
import { response } from '../utils/response';

const router = express.Router();

router.post('/hello-world', async (req, res) => { 
  response(res, 200, 'Hello World');
});

export default router;
