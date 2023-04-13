import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Messages } from './messages.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Messages.name, schema: Messages }]),
  ],
  providers: [MessagesGateway, MessagesService]
})
export class MessagesModule {}