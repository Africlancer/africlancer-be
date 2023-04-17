import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Message } from './message.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: Message }]),
  ],
  providers: [MessagesGateway, MessagesService]
})
export class MessagesModule {}