import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { PageParams, PageResult, Profile, ProfileDocument, handlePageFacet, handlePageResult } from "./profile.schema";


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
              const skills = profile.skills.map(skill => new RegExp(skill as any, 'i'));
              delete profile.skills;
              if(profile.minRate || profile.maxRate){
                const maxRate = profile.maxRate;
                const minRate = profile.minRate;
                delete profile.hourlyRate;
                delete profile.minRate;
                delete profile.maxRate;
                query = await this.profileModel.find({"$and":[profile, {fullName: {"$regex":name[i], "$options":"i"}}, {skills: { $in: skills }}, {hourlyRate: { "$lte": maxRate, "$gte": minRate }}]});
              }else{
                query = await this.profileModel.find({"$and":[profile, {fullName: {"$regex":name[i], "$options":"i"}}, {skills: { $in: skills }}]});
              }
            }else{
              if(profile.minRate || profile.maxRate){
                const maxRate = profile.maxRate;
                const minRate = profile.minRate;
                delete profile.hourlyRate;
                delete profile.minRate;
                delete profile.maxRate;
                query = await this.profileModel.find({"$and":[profile, {fullName: {"$regex":name[i], "$options":"i"}}, {hourlyRate: { "$lte": maxRate, "$gte": minRate }}]});
              }else{
                query = await this.profileModel.find({"$and":[profile, {fullName: {"$regex":name[i], "$options":"i"}}]});
              }
              //query = await this.profileModel.find({"$and":[profile, {fullName: {"$regex":name[i], "$options":"i"}}]});
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
          if(profile.minRate || profile.maxRate){
            const maxRate = profile.maxRate;
            const minRate = profile.minRate;
            delete profile.hourlyRate;
            delete profile.minRate;
            delete profile.maxRate;
            query = await this.profileModel.find({"$and":[profile, {skills: { "$in": skills }}, {hourlyRate: { "$lte": maxRate, "$gte": minRate }}]});
          }else{
            query = await this.profileModel.find({"$and":[profile, {skills: { "$in": skills }}]});
          }
          //query = await this.profileModel.find({"$and":[profile, {skills: { $in: skills }}]});
          if(query){
            return query;
          }
        }

        if(profile.minRate || profile.maxRate){
          let query:Profile[]; 
          const maxRate = profile.maxRate;
          const minRate = profile.minRate;
          delete profile.hourlyRate;
          delete profile.minRate;
          delete profile.maxRate;
          query = await this.profileModel.find({"$and":[profile, {hourlyRate: { "$gte": minRate, "$lte": maxRate }}]});

          if(query){
            return query;
          }
        }
        console.log(profile)
        return await this.profileModel.find({"$and":[profile]});
      }

    public async page(profile: Partial<Profile>, fullSearch:Boolean, page: PageParams): Promise<PageResult<Profile>> {
      if(profile.userID) profile.userID = new Types.ObjectId(profile.userID);
      if(profile.fullName && !fullSearch){
        const name = profile.fullName.split(" ");
        delete profile.fullName;
        for (let i in name){
          let query:any; 
          if(profile.skills){
            const skills = profile.skills.map(skill => new RegExp(skill as any, 'i'));
            delete profile.skills;
            if(profile.minRate || profile.maxRate){
              const maxRate = profile.maxRate;
              const minRate = profile.minRate;
              delete profile.hourlyRate;
              delete profile.minRate;
              delete profile.maxRate;
              query = await this.profileModel.aggregate([
                {$match: {"$and":[profile, {fullName: {"$regex":name[i], "$options":"i"}}, {skills: { $in: skills }}, {hourlyRate: { "$lte": maxRate, "$gte": minRate }}]}},
                { $sort: { createdAt: -1 } },
                { ...handlePageFacet(page) },
              ]);
            }else{
              query = await this.profileModel.aggregate([
                {$match: {"$and":[profile, {fullName: {"$regex":name[i], "$options":"i"}}, {skills: { $in: skills }}]}},
                { $sort: { createdAt: -1 } },
                { ...handlePageFacet(page) },
              ]);
            }
          }else{
            if(profile.minRate || profile.maxRate){
              const maxRate = profile.maxRate;
              const minRate = profile.minRate;
              delete profile.hourlyRate;
              delete profile.minRate;
              delete profile.maxRate;
              query = await this.profileModel.aggregate([
                {$match: {"$and":[profile, {fullName: {"$regex":name[i], "$options":"i"}}, {hourlyRate: { "$lte": maxRate, "$gte": minRate }}]}},
                { $sort: { createdAt: -1 } },
                { ...handlePageFacet(page) },
              ]);
            }else{
              query = await this.profileModel.aggregate([
                {$match: {"$and":[profile, {fullName: {"$regex":name[i], "$options":"i"}}]}},
                { $sort: { createdAt: -1 } },
                { ...handlePageFacet(page) },
              ]);
            }
          }
          if(query){
            return handlePageResult(query);
          }
        }
      }
      if(profile.skills){
        let query:any; 
        const skills = profile.skills.map(skill => new RegExp(skill as any, 'i'));
        delete profile.skills;
        if(profile.minRate || profile.maxRate){
          const maxRate = profile.maxRate;
          const minRate = profile.minRate;
          delete profile.hourlyRate;
          delete profile.minRate;
          delete profile.maxRate;
          query = await this.profileModel.aggregate([
            {$match: {"$and":[profile, {skills: { "$in": skills }}, {hourlyRate: { "$lte": maxRate, "$gte": minRate }}]}},
            { $sort: { createdAt: -1 } },
            { ...handlePageFacet(page) },
          ]);
        }else{
          query = await this.profileModel.aggregate([
            {$match: {"$and":[profile, {skills: { "$in": skills }}]}},
            { $sort: { createdAt: -1 } },
            { ...handlePageFacet(page) },
          ]);
        }
        if(query){
          return handlePageResult(query);
        }
      }

      if(profile.minRate || profile.maxRate){
        let query:any; 
        const maxRate = profile.maxRate;
        const minRate = profile.minRate;
        delete profile.hourlyRate;
        delete profile.minRate;
        delete profile.maxRate;
        query = await this.profileModel.aggregate([
          {$match: {"$and":[profile, {hourlyRate: { "$gte": minRate, "$lte": maxRate }}]}},
          { $sort: { createdAt: -1 } },
          { ...handlePageFacet(page) },
        ]);
        if(query){
          return handlePageResult(query);
        }
      }
      return this.profileModel.aggregate([
        {$match: {"$and":[profile]}},
        { $sort: { createdAt: -1 } },
        { ...handlePageFacet(page) },
      ])
      .then(handlePageResult)
      .then((rs) => {
        return rs;
      });
    }
    
}