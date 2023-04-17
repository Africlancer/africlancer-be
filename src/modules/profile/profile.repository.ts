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

    async findOne(profile: Partial<Profile>):Promise<Profile>{
        return this.profileModel.findOne(profile)
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

    public async findFilter(profile: Partial<Profile>, fullSearch:Boolean): Promise<Profile[]> {
        if(profile.userID) profile.userID = new Types.ObjectId(profile.userID);
        if(profile.fullName && !fullSearch){
          const name = profile.fullName.split(" ");
          delete profile.fullName;
          for (let i in name){
            let query:Profile[]; 
            if(profile.skills){
              const skills:String[] = profile.skills;
              delete profile.skills;
              query = await this.profileModel.find({"$and":[profile, {fullName: {"$regex":name[i], "$options":"i"}}, {skills: { $in: skills }}]});
            }else{
              query = await this.profileModel.find({"$and":[profile, {fullName: {"$regex":name[i], "$options":"i"}}]});
            }
            if(query){
              return query;
            }
          }
        }
        if(profile.skills){
          let query:Profile[]; 
          const skills = profile.skills.map(skill => new RegExp(skill as any, 'i'));
          delete profile.skills;
          query = await this.profileModel.find({"$and":[profile, {skills: { $in: skills }}]});
          if(query){
            return query;
          }
        }
        return await this.profileModel.find({"$and":[profile]});
      }
}