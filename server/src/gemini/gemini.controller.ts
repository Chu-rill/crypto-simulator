import { Controller, Post, Body, Get, Query, UseGuards } from "@nestjs/common";
import { GeminiService } from "./gemini.service";
import { AuthGuard } from "src/guard/auth.guard";

@UseGuards(AuthGuard)
@Controller("ai")
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post("generate")
  async generateContent(@Body() body: { prompt: string; model?: string }) {
    const { prompt } = body;
    return {
      result: await this.geminiService.generateContent(prompt),
    };
  }

  @Get("generate")
  async generateContentGet(@Query("prompt") prompt: string) {
    return {
      result: await this.geminiService.generateContent(prompt),
    };
  }
}
