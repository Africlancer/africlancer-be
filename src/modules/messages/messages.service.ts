import { Injectable } from '@nestjs/common';
import { CreateMessageInput, Message } from './message.model';

@Injectable()
export class MessagesService {
  messages: Message[] = [{name:"Mark", text:"Hello"}]
  clientToUser = {}

  identify(name:string, clientid:string){
    this.clientToUser[clientid] = name;
    return Object.values(this.clientToUser);
  }

  getClientName(clientid:string){
    return this.clientToUser[clientid];
  }

  create(createMessage: CreateMessageInput, clientid: string) {
    const message:Message = {
      name: this.clientToUser[clientid],
      text: createMessage.text
    }
    this.messages.push(message);
    return message;
  }

  findAll() {
    return this.messages;
  }
}
