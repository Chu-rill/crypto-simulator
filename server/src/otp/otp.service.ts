import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { OtpRepository } from './otp.repository';

@Injectable()
export class OtpService {
  constructor(private readonly otpRepository: OtpRepository) {}

  async generateOTP(email: string): Promise<string> {
    const otpCode = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes

    const otp = await this.otpRepository.createOTP(email, otpCode, expiresAt);

    if (!otp) {
      return 'Failed to create OTP';
    }

    return otpCode;
  }

  async verifyOTP(email: string, enteredOTP: string) {
    const otpRecord = await this.otpRepository.getOTPDetails(email);

    if (!otpRecord) {
      throw new NotFoundException('OTP not found');
    }

    // Check if OTP is expired
    if (new Date() > otpRecord.expiresAt) {
      await this.otpRepository.deleteOTP(email);
      throw new BadRequestException('OTP expired');
    }

    // Check if OTP matches
    if (otpRecord.code !== enteredOTP) {
      throw new BadRequestException('Invalid OTP');
    }

    // OTP is valid - Delete OTP after use
    await this.otpRepository.deleteOTP(email);
  }
}
