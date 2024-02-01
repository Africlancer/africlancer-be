import RequestWithUser from 'src/modules/auth/requestWithUser.interface';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { MessageDto } from './dto/message.dto';
import { ChatsService } from './chats.service';
import { Body, Controller, Post, Req, UseGuards, Get } from '@nestjs/common';

@Controller('chats')
export class ChatsController {
  constructor(private chatsService: ChatsService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createMessage(
    @Body() message: MessageDto,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user['sub'];
    return this.chatsService.createMessage(message, userId);
  }

  @UseGuards(JwtGuard)
  @Get()
  async getAllMessages() {
    return this.chatsService.getAllMessages();
  }
}
