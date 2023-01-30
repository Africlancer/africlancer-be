import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProfileRepository } from "./profile.repository";
import { Education, Experience, Publications, Qualification, Profile } from "./profile.schema";
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

    public async findOne(user:string):Promise<Profile>{
        return this.profileRepository.findOne(user)
    }

    public async updateOne(_id:string, profile:Partial<Profile>):Promise<void>{
        await this.profileRepository.updateOne(_id, profile)
    }

    public async deleteOne(_id:string):Promise<void>{
        await this.profileRepository.deleteOne(_id)
    }
    
    public async addOrUpdateEducation(model:Education){

        const profile = await this.profileRepository.findOne(model.profileId);
        console.log(profile)

        if(!profile) throw new HttpException('pROFILE NOT FOUND', HttpStatus.NOT_FOUND);

        const prof = (profile as any)._doc || profile;
        //update education not working, there's no id in model/...
        if(model._id){
            const index  = prof.education.findIndex(e=>e._id.toString() === model._id.toString());

            prof.education[index] = {...prof.education[index], ...model };
        }else{
            prof.education.push({...model,_id: new Types.ObjectId()})
        }

        await this.updateOne(profile._id?.toString(),prof);

        return prof;
    }

    public async deleteEducation(model:Education){
        const profile = await this.profileRepository.findOne(model.profileId);

    
        if(!profile) throw new HttpException('pROFILE NOT FOUND', HttpStatus.NOT_FOUND);

        const prof = (profile as any)._doc || profile;

        prof.educations = prof.educations.filter(e=>e._id.toString() === model._id.toString());

        await this.updateOne(profile._id?.toString(),prof);

        return prof;

    }


    public async addOrUpdateExperience(model:Experience){

        const profile = await this.profileRepository.findOne(model.profileId);
        console.log(profile)

        if(!profile) throw new HttpException('pROFILE NOT FOUND', HttpStatus.NOT_FOUND);

        const prof = (profile as any)._doc || profile;
        //update education not working, there's no id in model/...
        if(model._id){
            const index  = prof.experience.findIndex(e=>e._id.toString() === model._id.toString());

            prof.experience[index] = {...prof.experience[index], ...model };
        }else{
            prof.experience.push({...model,_id: new Types.ObjectId()})
        }

        await this.updateOne(profile._id?.toString(),prof);

        return prof;
    }

    public async deleteExperience(model:Experience){
        const profile = await this.profileRepository.findOne(model.profileId);

    
        if(!profile) throw new HttpException('pROFILE NOT FOUND', HttpStatus.NOT_FOUND);

        const prof = (profile as any)._doc || profile;

        prof.experience = prof.experience.filter(e=>e._id.toString() === model._id.toString());

        await this.updateOne(profile._id?.toString(),prof);

        return prof;

    }

    public async addOrUpdateQualification(model:Qualification){

        const profile = await this.profileRepository.findOne(model.profileId);
        console.log(profile)

        if(!profile) throw new HttpException('pROFILE NOT FOUND', HttpStatus.NOT_FOUND);

        const prof = (profile as any)._doc || profile;
        //update education not working, there's no id in model/...
        if(model._id){
            const index  = prof.qualification.findIndex(e=>e._id.toString() === model._id.toString());

            prof.qualification[index] = {...prof.qualification[index], ...model };
        }else{
            prof.qualification.push({...model,_id: new Types.ObjectId()})
        }

        await this.updateOne(profile._id?.toString(),prof);

        return prof;
    }

    public async deleteQualification(model:Qualification){
        const profile = await this.profileRepository.findOne(model.profileId);

    
        if(!profile) throw new HttpException('pROFILE NOT FOUND', HttpStatus.NOT_FOUND);

        const prof = (profile as any)._doc || profile;

        prof.qualification = prof.qualification.filter(e=>e._id.toString() === model._id.toString());

        await this.updateOne(profile._id?.toString(),prof);

        return prof;

    }

    public async addOrUpdatePublications(model:Publications){

        const profile = await this.profileRepository.findOne(model.profileId);
        console.log(profile)

        if(!profile) throw new HttpException('pROFILE NOT FOUND', HttpStatus.NOT_FOUND);

        const prof = (profile as any)._doc || profile;
        //update education not working, there's no id in model/...
        if(model._id){
            const index  = prof.publications.findIndex(e=>e._id.toString() === model._id.toString());

            prof.publications[index] = {...prof.publications[index], ...model };
        }else{
            prof.publications.push({...model,_id: new Types.ObjectId()})
        }

        await this.updateOne(profile._id?.toString(),prof);

        return prof;
    }

    public async deletePublications(model:Publications){
        const profile = await this.profileRepository.findOne(model.profileId);

    
        if(!profile) throw new HttpException('pROFILE NOT FOUND', HttpStatus.NOT_FOUND);

        const prof = (profile as any)._doc || profile;

        prof.publications = prof.publications.filter(e=>e._id.toString() === model._id.toString());

        await this.updateOne(profile._id?.toString(),prof);

        return prof;

    }
}