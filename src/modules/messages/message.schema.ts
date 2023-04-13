import { AutoMap } from "@automapper/classes";
import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type MessageDocument = HydratedDocument <Message>


@Schema()
export class Message{
    @AutoMap()
    message: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);