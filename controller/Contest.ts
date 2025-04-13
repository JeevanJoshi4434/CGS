
import { Contest } from "../types/contest";
import { User } from "../types/user";
import { Base64 } from "../utils/base64";
import { response } from "../utils/response";
import MemoryCache from "./cache";
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { QueueManager } from "../services/QueueManager";

export default class ContestController extends MemoryCache {
    constructor() {
        super();
    }

    public async getContest(req: Request, res: Response): Promise<Response> {

            const { id, detailed="false" } = req.query;
            const data = await this.get(`contest:${id}`) as Contest;
            if (!data) return response(res, 404, 'Contest not found');

            const link = `token=${data._id}&&date=${data.date}&&test=true`;
            const sharableLink = `${process.env.BASE_URL}?${Base64.encode(link)}`;

            return response(res, 200, 'Success', { detail: detailed==="true" ? data : null, link: sharableLink });
    }

    public async login(req: Request, res: Response): Promise<Response> {
            const { id, email, phone_number, DOB, address, school, name }: User = req.body;

            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!emailRegex.test(email)) return response(res, 400, 'Invalid email');

            // Check if user is already registered for this contest
            if(await this.get(`contest:${id}:user:${email}`)){
                return response(res, 400, 'Login already done', {redirect: process.env.BASE_URL}); // !!TODO: use middleware
            }

            // Lookup at Redis Memory Cache
            const data = await this.get(`contest:${id}`) as Contest;
            if (!data) return response(res, 404, 'Contest is not live yet');

            // Generate JWT
            const sessionToken = jwt.sign({ email, phone_number }, process.env.JWT_SECRET as string);

            // Generate login link
            const link = `token=${sessionToken}&&date=${data.date}&&started=true&&testId=${id}`;
            const sharableLink = `${process.env.BASE_URL}/start?${Base64.encode(link)}`;

            const UserData: User & {timestamp: number} = {
                id,
                email,
                phone_number,
                DOB,
                address,
                school,
                name,
                timestamp: Date.now()
            };

            // Store user data onto Redis Memory Cache
            await this.set(`contest:${id}:user:${email}`, { data: Base64.encode(JSON.stringify(UserData)), token: sessionToken });

            return response(res, 200, 'Success', { contest: data, redirect: sharableLink, token: sessionToken });
    }

    public async submit(req: Request, res: Response): Promise<Response> {
            const { data, contestId }: {
                data: any,
                contestId: string
            } = req.body;

            // Token and user are already validated by middleware
            const userEmail = (req.user as any).email;
            // Verify user is registered for this contest
            const user = await this.get(`contest:${contestId}:user:${userEmail}`) as { data: string, token: string };
            if (!user) {
                return response(res, 400, 'Login to continue', { redirect: process.env.BASE_URL });
            }

            const queueData = {
                data,
                additionalInfo: user.data
            }

            // Add job to queue
            const queueName = `contest_${contestId}_queue`;
            const job = await QueueManager.addJob(queueName, {
                contestId,
                userId: userEmail,
                submissionData: queueData,
                timestamp: new Date()
            });

            return response(res, 200, 'Submission queued successfully', {
                jobId: job.id,
                status: await job.getState()
            });
    }

    public async createContest(req: Request, res: Response): Promise<Response> {
            const { date }: { date: string } = req.body;

            if (!date) {
                return response(res, 400, 'Date is required');
            }

            // Generate a unique ID for the contest
            const contestId = Date.now().toString();

            // Create contest object
            const contestData: Contest = {
                _id: parseInt(contestId),
                result: [],
                date,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            // Store in Redis
            const saved = await this.set(`contest:${contestId}`, contestData);

            if (!saved) {
                return response(res, 500, 'Failed to create contest');
            }

            // Create a worker for this contest
            const { ContestWorker } = await import('../workers/contestWorker');
            ContestWorker.createWorker(contestId);

            // Generate a sharable link
            const link = `token=${contestId}&&date=${date}&&test=true`;
            const sharableLink = `${process.env.BASE_URL}?${Base64.encode(link)}`;

            return response(res, 201, 'Contest created successfully', {
                contestId,
                link: sharableLink
            });
    }
}
