import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


export type BidDocument = HydratedDocument<Bid>;

@Schema({collection:"bids"})
export class Bid{
    _id: Types.ObjectId;

    @Prop({required:true})
    userID: Types.ObjectId;

    @Prop({required:true})
    projectID: Types.ObjectId;

    @Prop({required:true})
    proposal: string;

    @Prop({required:true, default:false})
    isAwarded: boolean;
    
    @Prop()
    budget?: number;

    @Prop()
    hourlyRate?: number;

    @Prop({required:true})
    deliveredIn: number;

}


export const BidSchema = SchemaFactory.createForClass(Bid)