import { IsArray, IsString } from 'class-validator';

export class ChatDto {
  @IsArray()
  messages: {
    role: 'user' | 'assistant';
    content: string;
  }[];
}
