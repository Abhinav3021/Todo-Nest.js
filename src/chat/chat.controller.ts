import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async chat(@Body() body: ChatDto, @Res() res: Response) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    res.setHeader('Transfer-Encoding', 'chunked');

    try {
      const stream = await this.chatService.streamChat(body.messages);

      for await (const chunk of stream) {
        res.write(chunk.content);
      }

      res.end();
    } catch (error) {res.status(500).end('AI service unavailable.');
    }
  }
}
