import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Message, MessageDocument } from "./message.schema";
import { Model } from "mongoose";

@Injectable()
export class ChatsRepository{
    constructor(
        @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    ){}

    public async create(message:Message, userId:string): Promise<Message>{
        const newMessage = new this.messageModel({ ...message, userId });
        return newMessage.save();

    }

    public async find(message:Partial<Message>): Promise<Message[]>{
        return this.messageModel.find(message);
    }

    async getAllMessages() {
        return this.messageModel.find().populate('user');
    }
}