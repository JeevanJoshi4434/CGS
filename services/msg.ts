import axios, { AxiosRequestHeaders } from 'axios';

export interface SMSPayload {
  route: string;
  message?: string;
  variables_values?: string;
  sender_id?: string;
  schedule_time?: string;
  flash?: number;
  numbers: string;
}a

export interface SMSResponse {
  return: boolean;
  request_id: string;
  message: string[];
  status_code: number;
}

export class SMSService {
  protected readonly baseUrl: string = 'https://www.fast2sms.com/dev/bulkV2';
  protected readonly headers: AxiosRequestHeaders;

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
      console.error('SMS sending failed:', error.message);
      throw new Error(error?.response?.data || 'Failed to send SMS');
    }
  }
}


import { SMSService, SMSPayload, SMSResponse } from './SMSService';

export class SMSProvider extends SMSService {
  constructor(apiKey: string) {
    super(apiKey);
  }

  // 🔐 Send OTP
  public async sendOTP(numbers: string, variables: string, messageTemplate: string, senderId: string = ''): Promise<SMSResponse> {
    const payload: SMSPayload = {
      route: 'dlt',
      sender_id: senderId,
      message: messageTemplate,
      variables_values: variables,
      schedule_time: '',
      flash: 0,
      numbers,
    };
    return this.sendSMS(payload);
  }

  // ⚡ Send Quick Message
  public async sendQuick(numbers: string, message: string): Promise<SMSResponse> {
    const payload: SMSPayload = {
      route: 'q',
      message,
      schedule_time: '',
      flash: 0,
      numbers,
    };
    return this.sendSMS(payload);
  }

  // 🏷️ Send DLT Message
  public async sendDLT(numbers: string, messageTemplate: string, variables: string, senderId: string = ''): Promise<SMSResponse> {
    const payload: SMSPayload = {
      route: 'dlt',
      sender_id: senderId,
      message: messageTemplate,
      variables_values: variables,
      schedule_time: '',
      flash: 0,
      numbers,
    };
    return this.sendSMS(payload);
  }
}


import { SMSProvider } from './SMSProvider';

const apiKey = 'e8P5HUoqDfIZwgRcbaOSpXMEFj0TuJnBLiGCmy4l9K2QkA6dWvZ8FRTYOfu0NXirHECyWBcwVD4k3jes';
const sms = new SMSProvider(apiKey);

async function main() {
  try {
    // Send OTP
    const otpResponse = await sms.sendOTP('7668073035', '1234', 'Your OTP is %23%23%23%23');
    console.log('OTP Response:', otpResponse);

    // Send Quick
    const quickResponse = await sms.sendQuick('7668073035', 'Hi there, quick update!');
    console.log('Quick Response:', quickResponse);

    // Send DLT
    const dltResponse = await sms.sendDLT('7668073035', 'Your code is %23%23%23%23', '5678');
    console.log('DLT Response:', dltResponse);
  } catch (error) {
    console.error('Error:', error);
  }
}



