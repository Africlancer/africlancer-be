import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Profile, ProfileDocument } from "./profile.schema";


@Injectable()
export class ProfileRepository{
    constructor(@InjectModel(Profile.name) private profileModel:Model<ProfileDocument>){}

    public create(profile: Profile): Promise<Profile>{
        profile.userID = (new Types.ObjectId(profile.userID)) as any;
        const createProfile = new this.profileModel(profile);
        return createProfile.save();
    }

    async findOne(_id: string):Promise<Profile>{
        return this.profileModel.findOne({_id:new Types.ObjectId(_id)})
    }

    async find(userQuery: Partial<Profile>):Promise<Profile[]>{
        if(userQuery._id)
            userQuery._id = new Types.ObjectId(userQuery._id);
        return await this.profileModel.find(userQuery)
    }

    async updateOne(_id:string, profile:Partial<Profile>):Promise<void>{
        delete profile._id;
        await this.profileModel.updateOne({_id: new Types.ObjectId(_id)}, profile);
    }

    async deleteOne(_id:string):Promise<void>{
        await this.profileModel.deleteOne({_id:new Types.ObjectId(_id)});
    }
}