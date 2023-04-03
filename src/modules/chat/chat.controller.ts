import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Message } from './chat.schema';
import { MessageResolver } from './chat.resolver';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageResolver: MessageResolver) {}

  @Get()
  async getAllMessages(): Promise<Message[]> {
    return this.messageResolver.messages();
  }

  @Get(':id')
  async getMessageById(@Param('id') id: string): Promise<Message> {
    return this.messageResolver.message(id);
  }

  @Post()
  async createMessage(
    @Body('user') user: string,
    @Body('message') message: string,
  ): Promise<Message> {
    return this.messageResolver.createMessage(user, message);
  }

  @Post(':id')
  async updateMessage(
    @Param('id') id: string,
    @Body('user') user: string,
    @Body('message') message: string,
  ): Promise<Message> {
    return this.messageResolver.updateMessage(id, user, message);
  }

  @Post(':id/delete')
  async deleteMessage(@Param('id') id: string): Promise<boolean> {
    return this.messageResolver.deleteMessage(id);
  }
}
