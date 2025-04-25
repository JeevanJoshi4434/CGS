import { SMSPayload, SMSResponse, SMSService } from "../services/SmsService";

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

