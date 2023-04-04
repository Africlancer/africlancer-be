import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProfileRepository } from "./profile.repository";
import { Education, Experience, Publication, Qualification, Profile } from "./profile.schema";
import { Types } from "mongoose";
import { UserService } from "../user/user.service";
import { User } from "../user/user.schema";


@Injectable()
export class ProfileService{
    findOneBy(arg0: { id: number; }): any {
        throw new Error("Method not implemented.");
    }
    constructor(private readonly profileRepository:ProfileRepository, private readonly userService:UserService){}

    public create(profile:Profile):Promise<Profile>{
        return this.profileRepository.create(profile)
    }

    public async find(profile:Partial<Profile>):Promise<Profile[]>{
        return this.profileRepository.find(profile)
    }

    public async findOne(profile:Partial<Profile>):Promise<Profile>{
        return this.profileRepository.findOne(profile)
    }

    public async updateOne(_id:string, profile:Partial<Profile>):Promise<void>{
        await this.profileRepository.updateOne(_id, profile)
    }

    public async deleteOne(_id:string):Promise<void>{
        await this.profileRepository.deleteOne(_id)
    }
    
    public async addOrUpdateEducation(model:Education, profileID:string){
        model.profileId = profileID;
        const profile = await this.profileRepository.findOne({_id:new Types.ObjectId(profileID)});

        if(!profile) throw new HttpException('Profile not Found', HttpStatus.NOT_FOUND);

        const prof = (profile as any)._doc || profile;

        if(model._id){
            const index  = prof.education.findIndex(e=>e._id.toString() === model._id.toString());
            delete model._id;
            prof.education[index] = {...prof.education[index], ...model };
        }else{
            prof.education.push({...model,_id: new Types.ObjectId()})
        }

        await this.updateOne(profileID, prof);

        return prof;
    }

    public async deleteEducation(educationID:string, profileID:string){
        const profile = await this.profileRepository.findOne({_id:new Types.ObjectId(profileID)});
    
        if(!profile) throw new HttpException('Profile not Found', HttpStatus.NOT_FOUND);

        const prof = (profile as any)._doc || profile;

        prof.education = prof.education.filter(e=>e._id.toString() !== educationID);

        await this.updateOne(profileID, prof);

        return prof;

    }


    public async addOrUpdateExperience(model:Experience, profileID:string){
        model.profileId = profileID;
        const profile = await this.profileRepository.findOne({_id:new Types.ObjectId(profileID)});

        if(!profile) throw new HttpException('Profile not Found', HttpStatus.NOT_FOUND);

        const prof = (profile as any)._doc || profile;

        if(model._id){
            const index  = prof.experience.findIndex(e=>e._id.toString() === model._id.toString());
            delete model._id;
            prof.experience[index] = {...prof.experience[index], ...model };
        }else{
            prof.experience.push({...model,_id: new Types.ObjectId()})
        }

        await this.updateOne(profileID, prof);

        return prof;
    }

    public async deleteExperience(experienceID:string, profileID:string){
        const profile = await this.profileRepository.findOne({_id:new Types.ObjectId(profileID)});

    
        if(!profile) throw new HttpException('Profile not Found', HttpStatus.NOT_FOUND);

        const prof = (profile as any)._doc || profile;

        prof.experience = prof.experience.filter(e=>e._id.toString() !== experienceID);

        await this.updateOne(profileID, prof);

        return prof;

    }

    public async addOrUpdateQualification(model:Qualification, profileID:string){
        model.profileId = profileID;
        const profile = await this.profileRepository.findOne({_id:new Types.ObjectId(profileID)});

        if(!profile) throw new HttpException('Profile not Found', HttpStatus.NOT_FOUND);

        const prof = (profile as any)._doc || profile;

        if(model._id){
            const index  = prof.qualification.findIndex(e=>e._id.toString() === model._id.toString());
            delete model._id;
            prof.qualification[index] = {...prof.qualification[index], ...model };
        }else{
            prof.qualification.push({...model,_id: new Types.ObjectId()})
        }

        await this.updateOne(profileID, prof);

        return prof;
    }

    public async deleteQualification(qualificationID:string, profileID:string){
        const profile = await this.profileRepository.findOne({_id:new Types.ObjectId(profileID)});

    
        if(!profile) throw new HttpException('Profile not Found', HttpStatus.NOT_FOUND);

        const prof = (profile as any)._doc || profile;

        prof.qualification = prof.qualification.filter(e=>e._id.toString() !== qualificationID);

        await this.updateOne(profileID, prof);

        return prof;

    }

    public async addOrUpdatePublication(model:Publication, profileID:string){
        model.profileId = profileID;
        const profile = await this.profileRepository.findOne({_id:new Types.ObjectId(profileID)});

        if(!profile) throw new HttpException('Profile not Found', HttpStatus.NOT_FOUND);

        const prof = (profile as any)._doc || profile;

        if(model._id){
            const index  = prof.publication.findIndex(e=>e._id.toString() === model._id.toString());
            delete model._id;
            prof.publication[index] = {...prof.publication[index], ...model };
        }else{
            prof.publication.push({...model,_id: new Types.ObjectId()})
        }

        await this.updateOne(profileID, prof);

        return prof;
    }

    public async deletePublication(publicationID:string, profileID:string){
        const profile = await this.profileRepository.findOne({_id:new Types.ObjectId(profileID)});

    
        if(!profile) throw new HttpException('Profile not Found', HttpStatus.NOT_FOUND);

        const prof = (profile as any)._doc || profile;

        prof.publication = prof.publication.filter(e=>e._id.toString() !== publicationID);

        await this.updateOne(profileID, prof);

        return prof;

    }

    async finduser(userId:string):Promise<User>{
        return this.userService.findOne({_id: new Types.ObjectId(userId)});
    }

    public async findFilter(profile: Partial<Profile>, fullSearch:Boolean): Promise<Profile[]> {
        return this.profileRepository.findFilter(profile, fullSearch);
    }
}