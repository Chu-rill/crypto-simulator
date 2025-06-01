import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { AudioService } from "src/audio/audio.service";
import { AdminGuard } from "src/guard/admin.guard";
import { SummaryService } from "src/summary/summary.service";

@UseGuards(AdminGuard)
@Controller("admin")
export class AdminController {
  constructor(
    private summaryService: SummaryService,
    private audioService: AudioService
  ) {}
  //AUDIO
  @Get("/audio")
  findAllAudios() {
    return this.audioService.getAudios();
  }

  //SUMMARY
  @Get("/summary")
  findAllSummaries() {
    return this.summaryService.findAllSummaries();
  }
}
