import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProfileRepository } from "./profile.repository";
import { Education, Profile } from "./profile.schema";
import { Types } from "mongoose";


@Injectable()
export class ProfileService{
    findOneBy(arg0: { id: number; }): any {
        throw new Error("Method not implemented.");
    }
    constructor(private readonly profileRepository:ProfileRepository){}

    public create(profile:Profile):Promise<Profile>{
        return this.profileRepository.create(profile)
    }

    public async find(profile:Partial<Profile>):Promise<Profile[]>{
        return this.profileRepository.find(profile)
    }

    public async findOne(user:Partial<Profile>):Promise<Profile>{
        return this.profileRepository.findOne(user as any)
    }

    public async updateOne(_id:string, profile:Partial<Profile>):Promise<void>{
        await this.profileRepository.updateOne(_id, profile)
    }

    public async deleteOne(_id:string):Promise<void>{
        await this.profileRepository.deleteOne(_id)
    }

    public async addOrUpdateEducation(model:Education){
        const profile = await this.findOne({_id: model.profileId as any});

        if(!profile) throw new HttpException('pROFILE NOT FOUND', HttpStatus.NOT_FOUND);

        const prof = (profile as any)._doc || profile;

        if(model._id){
            const index  = prof.educations.findIndex(e=>e._id.toString() === model._id.toString());

            prof.educations[index] = {...prof.educations[index], ...model };
        }else{
            prof.educations.push({...model,_id: new Types.ObjectId()})
        }

        await this.updateOne(profile._id?.toString(),prof);

        return prof;
    }

    public async deleteEducation(model:Education){
        const profile = await this.findOne({_id: model.profileId as any});

    

        if(!profile) throw new HttpException('pROFILE NOT FOUND', HttpStatus.NOT_FOUND);

        const prof = (profile as any)._doc || profile;

        prof.educations = prof.educations.filter(e=>e._id.toString() === model._id.toString());

        await this.updateOne(profile._id?.toString(),prof);

        return prof;

    }
}