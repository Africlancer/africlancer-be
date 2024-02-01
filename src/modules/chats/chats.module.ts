import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './message.schema';
import { AuthModule } from '../auth/auth.module';
import { ChatsRepository } from './chats.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    AuthModule
  ],
  controllers: [ChatsController],
  providers: [ChatsService, ChatsRepository],
  exports:[ChatsRepository]
})
export class ChatsModule {}
