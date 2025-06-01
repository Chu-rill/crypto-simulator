import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EmailAndPasswordAuthModule } from './auth/email-and-password-auth/email-and-password-auth.module';
import { DatabaseModule } from './infra/db/database.module';
import { OauthModule } from './auth/oauth/oauth.module';
import { OtpModule } from './otp/otp.module';
import { GeminiModule } from './gemini/gemini.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make the ConfigModule global
      envFilePath: '.env', // Specify the path to your .env file
    }),
    EmailAndPasswordAuthModule,
    UserModule,
    DatabaseModule,
    OauthModule,
    OtpModule,
    GeminiModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
