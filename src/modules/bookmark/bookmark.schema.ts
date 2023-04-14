import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


export type BookMarkDocument = HydratedDocument<BookMark>;

@Schema({collection:"bookmark"})
export class BookMark{
    _id: Types.ObjectId;

    @Prop({required:true})
    userID: Types.ObjectId;

    @Prop({required:true})
    projectID: Types.ObjectId;
}


export const BookmarkSchema = SchemaFactory.createForClass(BookMark)