import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GoogleGenAI } from "@google/genai";

@Injectable()
export class GeminiService {
  private ai: GoogleGenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>("GOOGLE_API_KEY");
    if (!apiKey) {
      throw new Error("GOOGLE_API_KEY is not defined in environment variables");
    }
    this.ai = new GoogleGenAI({ apiKey });
  }

  async generateContent(prompt: string): Promise<any> {
    let model = "gemini-2.0-flash";
    try {
      const response = await this.ai.models.generateContent({
        model,
        contents: prompt,
      });
      return response;
      // return response.result.candidates[0].content.parts[0].text;
    } catch (error) {
      throw new Error(`Failed to generate content: ${error.message}`);
    }
  }
}
