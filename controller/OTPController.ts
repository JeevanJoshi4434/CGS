import { QueueManager } from "../services/QueueManager";
import { Base64 } from "../utils/base64";
import { generateOTP } from "../utils/OTPGenerator";
import { response } from "../utils/response";
import { SMSProvider } from "../utils/SMSProvider";
import MemoryCache from "./cache";
import { Request, Response } from 'express';

export default class OTPController extends MemoryCache {
    private apiKey: string;
    private sms: SMSProvider;

    public constructor() {
        super();
        this.apiKey = process.env.SMS_API_KEY as string;
        this.sms = new SMSProvider(this.apiKey);
    }
    public async sendOTP(req: Request, res: Response): Promise<Response> {
        const { phoneNumber, id }: { phoneNumber: string, id: string } = req.body;
        if (!phoneNumber) return response(res, 400, 'Phone number is required');
        if(await this.get(`contest:${id}`) === null) return response(res, 400, 'Contest not found');
        if(await this.get(`contest:${id}:user:${phoneNumber}`)) return response(res, 401, 'Already attempted the test');
        if (phoneNumber.length < 10) return response(res, 400, 'Invalid phone number');
        if (await this.get(`otp:${phoneNumber}`)) {
            const otp = await this.get(`otp:${phoneNumber}`);
            if (! await this.sms.sendQuick(phoneNumber, `Your OTP for CGS test is ${otp}`)) {
                return response(res, 500, 'Failed to send OTP');
            }
            return response(res, 200, 'OTP sent');
        }
        const otp = generateOTP(6);
        if (!otp) return response(res, 500, 'Failed to generate OTP');

        await this.setWithTime(`otp:${phoneNumber}`, otp, 900);
        if (! await this.sms.sendQuick(phoneNumber, `Your OTP for CGS test is ${otp}`)) {
            return response(res, 500, 'Failed to send OTP');
        }
        return response(res, 200, 'OTP sent');
    }

    public async verifyOTP(req: Request, res: Response): Promise<Response> {
        const { phoneNumber, otp }: { phoneNumber: string, otp: string } = req.body;

        if (!phoneNumber || !otp) return response(res, 400, 'Phone number and OTP are required');
       
        if (! await this.get(`otp:${phoneNumber}`)) return response(res, 400, 'OTP not found');
       let existingOTP = JSON.stringify(await this.get(`otp:${phoneNumber}`));
        if (existingOTP === 'null') return response(res, 400, 'OTP not found');
        console.log(existingOTP, otp, typeof existingOTP, typeof otp);
        if (otp !== existingOTP) return response(res, 400, 'Invalid OTP');
       
        this.del(`otp:${phoneNumber}`);
       
        return response(res, 200, 'OTP verified');
    }

    public async SendDownloadLink(req: Request, res: Response): Promise<Response> {
        const { contestId }: { contestId: string } = req.body;

        if (!contestId) return response(res, 400, 'Contest ID is required');

        const queueName = `contest_${contestId}_queue`;
        const queue = await QueueManager.getQueue(queueName);
        if (!queue) return response(res, 500, 'Failed to get or create queue');

        const jobs = await queue.getJobs(['completed', 'failed', 'waiting', 'active', 'delayed']);

        if (!jobs || jobs.length === 0) {
            return response(res, 404, 'No users found in the queue');
        }

        const failures: { phone?: string, error: string }[] = [];
        let numbers = "";
        for (const job of jobs) {
            try {
                const phone_number = job.data.userId;

                if (!phone_number) {
                    failures.push({ error: 'Phone number missing in user data' });
                    continue;
                }

                numbers += `${phone_number},`;

            } catch (err: any) {
                failures.push({ error: err.message || 'Unknown error while parsing job data' });
            }

            numbers = numbers.slice(0, -1);
            const resultLink = `${process.env.BASE_URL}/result/view?${Base64.encode(`testId=${contestId}`)}`;
            const message = `Your CGS test result is ready. Download from: ${resultLink}`;
            console.log(message);
            const success = await this.sms.sendQuick(numbers, message);
            if (!success) {
                failures.push({ phone: numbers, error: 'Failed to send SMS' });
            }
        }

        if (failures.length > 0) {
            return response(res, 207, 'Partial success with some failures', { failures });
        }

        return response(res, 200, 'Download links sent successfully', { jobs });
    }


}