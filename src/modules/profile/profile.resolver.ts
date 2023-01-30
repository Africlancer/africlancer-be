import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { CreateProfileInput, EducationInput, ExperienceInput, Profile, PublicationsInput, QualificationInput, QueryProfileInput } from "./profile.model";
import { ProfileService } from "./profile.service";
import { Education, Profile as ProfileSchema } from "./profile.schema";


@Resolver(of => Profile)
export class ProfileResolver{
    constructor(private profileService:ProfileService, @InjectMapper() private readonly classMapper: Mapper){}


    @Query(returns => Profile, {name:"findProfileByID"})
    async findProfileByID(@Args("profileID") profileID:string):Promise<Profile>{
        return this.classMapper.mapAsync(await this.profileService.findOne(profileID as any), ProfileSchema, Profile);
        //BEFORE MAPPING: return this.profileService.findOne(profileID)
    }

    @Query(returns => [Profile], {name:"findProfileByQuery"})
    async findProfileByQuery(@Args("query") query:QueryProfileInput):Promise<Profile[]>{
        //const queryMap = await this.classMapper.mapAsync(query, QueryProfileInput, ProfileSchema)
        return this.classMapper.mapArrayAsync(await this.profileService.find(query as unknown), ProfileSchema, Profile);
        //BEFORE MAPPING: return (this.profileService.find(query as any)) as any
    }

    @Mutation(returns => Profile, {name:"createProfile"})
    async createProfile(@Args("profile") profile:CreateProfileInput):Promise<Profile>{
        const queryMap = await this.classMapper.mapAsync(profile, CreateProfileInput, ProfileSchema)
        return await this.classMapper.mapAsync(await this.profileService.create(queryMap), ProfileSchema, Profile);
        //BEFORE MAPPING: return (await this.profileService.create(profile as any)) as any
    }

    @Mutation(returns => Boolean, {name:"updateProfile"})
    async updateProfile(
        @Args("profileID")
        profileID:string,
        @Args("profile")
        profile:QueryProfileInput
    ){
        const queryMap = await this.classMapper.mapAsync(profile, QueryProfileInput, ProfileSchema)
        await this.profileService.updateOne(profileID, queryMap)
        //BEFORE MAPPING: await this.profileService.updateOne(profileID, profile as any)
        return true;
    }

    @Query(returns => Boolean, {name: "deleteProfile"})
    async deleteProfile(@Args("id") id:string):Promise<Boolean>{
        await this.profileService.deleteOne(id)
        return true;
    }

    @Mutation(returns => Boolean, {name:"addOrUpdateEducation"})
    async addOrUpdateEducation(@Args("education") education:EducationInput){
        await this.profileService.addOrUpdateEducation(education as any)
        return true;
    }

    @Mutation(returns => Boolean, {name:"addOrUpdateExperience"})
    async addOrUpdateExperience(@Args("experience") experience:ExperienceInput){
        await this.profileService.addOrUpdateExperience(experience as any)
        return true;
    }

    @Mutation(returns => Boolean, {name:"addOrUpdateQualification"})
    async addOrUpdateQualification(@Args("qualification") qualification:QualificationInput){
        await this.profileService.addOrUpdateQualification(qualification as any)
        return true;
    }

    @Mutation(returns => Boolean, {name:"addOrUpdatePublications"})
    async addOrUpdatePublications(@Args("publication") publication:PublicationsInput){
        await this.profileService.addOrUpdatePublications(publication as any)
        return true;
    }
}