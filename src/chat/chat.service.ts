import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from '@langchain/openai';
import { assistantPrompt } from './prompts';

@Injectable()
export class ChatService {
  private model: ChatOpenAI;

  constructor(private readonly configService: ConfigService) {
    this.model = new ChatOpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
      model: this.configService.get<string>('OPENAI_MODEL') || 'gpt-4o-mini',
      temperature: 0.7,
      maxTokens: 500,
    });
  }

  async streamChat(messages: any[]) {
    const history = messages
      .slice(0, -1)
      .map((m) => `${m.role}: ${m.content}`)
      .join('\n');

    const input =
      messages[messages.length - 1]?.content || '';

    const prompt = await assistantPrompt.format({
      history,
      input,
    });

    return this.model.stream(prompt);
  }
}
