import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { SummaryModule } from "src/summary/summary.module";
import { AudioModule } from "src/audio/audio.module";
import { DatabaseModule } from "src/infra/db/database.module";

@Module({
  controllers: [AdminController],
  imports: [SummaryModule, AudioModule, DatabaseModule],
})
export class AdminModule {}
