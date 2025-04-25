import axios from 'axios';

export interface SMSPayload {
  route: string;
  message?: string;
  variables_values?: string;
  sender_id?: string;
  schedule_time?: string;
  flash?: number;
  numbers: string;
}

export interface SMSResponse {
  return: boolean;
  request_id: string;
  message: string[];
  status_code: number;
}

export class SMSService {
  protected readonly baseUrl: string = 'https://www.fast2sms.com/dev/bulkV2';
  protected readonly headers: Record<string, string>;

  constructor(protected apiKey: string) {
    this.headers = {
      authorization: this.apiKey,
      'Content-Type': 'application/json',
    };
  }

  protected async sendSMS(payload: SMSPayload): Promise<SMSResponse> {
    try {
      const response = await axios.post(this.baseUrl, payload, {
        headers: this.headers,
      });
      return response.data as SMSResponse;
    } catch (error: any) {
      console.error('SMS sending failed:', error?.response?.data || error.message);
      throw new Error(error?.response?.data || 'Failed to send SMS');
    }
  }
}
