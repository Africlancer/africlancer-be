import { AutoMap } from "@automapper/classes";
import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


export type MessagesDocument = HydratedDocument <Messages>


@Schema()
export class Messages{
    @AutoMap()
    _id: Types.ObjectId;

    @AutoMap()
    messages: string;
}

export const MessagesSchema = SchemaFactory.createForClass(Messages);