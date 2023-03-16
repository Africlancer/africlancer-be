import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Bid, BidDocument } from "./bid.schema";

@Injectable()
export class BidRepository{
    constructor(@InjectModel(Bid.name) private bidModel:Model<BidDocument>){}

    async findOne( bid:Partial<Bid>):Promise<Bid>{
        if(bid._id) bid._id = new Types.ObjectId(bid._id);
        if(bid.userID) bid.userID = new Types.ObjectId(bid.userID);
        if(bid.projectID) bid.projectID = new Types.ObjectId(bid.projectID);
        return this.bidModel.findOne(bid);
    }

    async find(bid:Partial<Bid>):Promise<Bid[]>{
        if(bid.projectID) bid.projectID = new Types.ObjectId(bid.projectID);
        return this.bidModel.find(bid);
    }

    async create(bid:Bid):Promise<Bid>{
        bid.userID = new Types.ObjectId(bid.userID);
        bid.projectID = new Types.ObjectId(bid.projectID);
        return this.bidModel.create(bid); 
    }

    async update(id:string, bid:Partial<Bid>):Promise<void>{
        await this.bidModel.updateOne({_id: new Types.ObjectId(id)}, bid);
    }

    async delete(id:string):Promise<void>{
        await this.bidModel.deleteOne({_id: new Types.ObjectId(id)});
    }
}