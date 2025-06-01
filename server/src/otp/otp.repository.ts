import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/prisma.service';

@Injectable()
export class OtpRepository {
  constructor(private readonly prisma: PrismaService) {}
  otpReturnObject = {
    code: true,
    email: true,
    expiresAt: true,
    createdAt: true,
  };

  async createOTP(email: string, code: string, expiresAt: Date) {
    const otp = await this.prisma.otp.upsert({
      where: { email },
      update: { code, expiresAt },
      create: { email, code, expiresAt },

      select: this.otpReturnObject,
    });
    return otp;
  }

  async getOTPDetails(email: string) {
    const otp = await this.prisma.otp.findUnique({
      where: { email },
    });
    return otp;
  }

  async deleteOTP(email: string) {
    const otp = await this.prisma.otp.delete({
      where: { email },
      select: this.otpReturnObject,
    });
    return otp;
  }
}
