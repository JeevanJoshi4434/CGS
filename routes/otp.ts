import express from 'express';
import ContestController from '../controller/Contest';
import { asyncHandler } from '../utils/asyncHandler';
import { validateToken } from '../middleware/auth';
import OTPController from '../controller/OTPController';

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const router = express.Router();
const otpController = new OTPController();


router.post('/send', asyncHandler(otpController.sendOTP.bind(otpController)));
router.post('/verify', asyncHandler(otpController.verifyOTP.bind(otpController)));
router.post('/result', asyncHandler(otpController.SendDownloadLink.bind(otpController)));

router.get('/',
    asyncHandler(
        async (req, res) => {
            return res.status(200).json({ message: 'OTP API v1' });
        }
    )
);

export default router;

