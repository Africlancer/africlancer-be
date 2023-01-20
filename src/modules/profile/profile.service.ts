import { Injectable } from "@nestjs/common";
import { ProfileRepository } from "./profile.repository";
import { Profile } from "./profile.schema";


@Injectable()
export class ProfileService{
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
}