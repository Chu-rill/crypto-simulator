import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import * as bodyParser from "body-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/api/v1");
  const limiter = rateLimit({
    max: 100, // 100 requests
    windowMs: 60 * 60 * 1000, // 1 hour
    message:
      "We have received too many requests from this IP. Please try again after one hour.",
  });
  app.use(limiter);
  app.use(helmet());
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  app.enableCors({
    origin: [
      "https://recapify1.vercel.app",
      "http://localhost:5173", // for development
    ], // Your frontend URL, default to *
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
