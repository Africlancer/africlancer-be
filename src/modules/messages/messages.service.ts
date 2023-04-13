import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Messages, MessagesDocument } from './messages.schema';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Messages.name) private messagesModel: Model<MessagesDocument>) {}

  clientToUser = {}

  identify(name:string, clientid:string){
    this.clientToUser[clientid] = name;
    return Object.values(this.clientToUser);
  }

  getClientName(clientid:string){
    return this.clientToUser[clientid];
  }

  public create(createMessage: Messages, clientid: string) {
    const message =  new this.messagesModel(createMessage);

    return message.save();
  }

  findAll() {
    return this.messagesModel;
  }
}
