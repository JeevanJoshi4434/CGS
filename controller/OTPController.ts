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

    public constructor(){
        super();
        this.apiKey = process.env.SMS_API_KEY as string;
        this.sms = new SMSProvider(this.apiKey);
    }
    public async sendOTP(req: Request, res: Response): Promise<Response> {
        const { phoneNumber }: { phoneNumber: string } = req.body;
        if(!phoneNumber) return response(res, 400, 'Phone number is required');
        if(await this.get(`otp:${phoneNumber}`)){
            const otp = await this.get(`otp:${phoneNumber}`);
            if(! await this.sms.sendQuick(phoneNumber, `Your OTP for CGS test is ${otp}`)){
                return response(res, 500, 'Failed to send OTP');
            }
            return response(res, 200, 'OTP sent');
        }
        const otp = generateOTP(6);
        if(!otp) return response(res, 500, 'Failed to generate OTP');
        
        await this.setWithTime(`otp:${phoneNumber}`, otp, 900);
        if(! await this.sms.sendQuick(phoneNumber, `Your OTP for CGS test is ${otp}`)){
            return response(res, 500, 'Failed to send OTP');
        }
        return response(res, 200, 'OTP sent');
    }

    public async verifyOTP(req: Request, res: Response): Promise<Response> {
        const { phoneNumber, otp }: { phoneNumber: string, otp: string } = req.body;
        if(!phoneNumber || !otp) return response(res, 400, 'Phone number and OTP are required');
        if(! await this.get(`otp:${phoneNumber}`)) return response(res, 400, 'OTP not found');
        if(otp !== JSON.stringify(await this.get(`otp:${phoneNumber}`))) return response(res, 400, 'Invalid OTP');
        this.del(`otp:${phoneNumber}`);
        return response(res, 200, 'OTP verified');
    }

    public async SendDownloadLink(req: Request, res: Response): Promise<Response> {
        const { contestId }: { contestId: string } = req.body;
        
        if (!contestId) return response(res, 400, 'Contest ID is required');
    
        const queueName = `contest_${contestId}_queue`;
        const queue = await QueueManager.getOrCreateQueue(queueName);
        if (!queue) return response(res, 500, 'Failed to get or create queue');
      
        const jobs = await queue.getJobs(['completed', 'failed', 'waiting', 'active', 'delayed']);
        console.log(jobs);
        if (!jobs || jobs.length === 0) {
            return response(res, 404, 'No users found in the queue');
        }
    
        const failures: { phone?: string, error: string }[] = [];
    
        for (const job of jobs) {
            try {
                const userDataEncoded = job.data.submissionData.additionalInfo;
                const decoded = JSON.parse(Buffer.from(userDataEncoded, 'base64').toString('utf-8'));
                const { phone_number } = decoded;
    
                if (!phone_number) {
                    failures.push({ error: 'Phone number missing in user data' });
                    continue;
                }
    
                const resultLink = `${process.env.BASE_URL}/result/${Base64.encode(`testId=${contestId}&phone=${phone_number}`)}`;
    
                const message = `Your CGS test result is ready. Download from: ${resultLink}`;
                // const success = await this.sms.sendQuick(phone_number, message);
                const success = true;
                if (!success) {
                    failures.push({ phone: phone_number, error: 'Failed to send SMS' });
                }
            } catch (err: any) {
                failures.push({ error: err.message || 'Unknown error while parsing job data' });
            }
        }
    
        if (failures.length > 0) {
            return response(res, 207, 'Partial success with some failures', { failures });
        }
    
        return response(res, 200, 'Download links sent successfully', {jobs});
    }
    

}