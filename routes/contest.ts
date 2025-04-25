import express from 'express';
import ContestController from '../controller/Contest';
import { asyncHandler } from '../utils/asyncHandler';
import { validateToken } from '../middleware/auth';

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const router = express.Router();
const contestController = new ContestController();

router.get('', asyncHandler(contestController.getContest.bind(contestController)));

router.post('/login', asyncHandler(contestController.login.bind(contestController)));
router.post('/submit', validateToken as express.RequestHandler, asyncHandler(contestController.submit.bind(contestController)));
router.post('/create', asyncHandler(contestController.createContest.bind(contestController)));

router.get('/',
    asyncHandler(
        async (req, res) => {
            return res.status(200).json({ message: 'Contest API' });
        }
    )
);

export default router;

