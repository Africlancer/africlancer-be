import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Messages, MessagesSchema } from './messages.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Messages.name, schema: MessagesSchema }]),
  ],
  providers: [MessagesGateway, MessagesService]
})
export class MessagesModule {}