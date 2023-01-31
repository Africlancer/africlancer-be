import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { CreateProfileInput, EducationInput, ExperienceInput, Profile, PublicationsInput, QualificationInput, QueryProfileInput } from "./profile.model";
import { ProfileService } from "./profile.service";
import { Education, Profile as ProfileSchema } from "./profile.schema";
import { GqlCurrentUser } from "../auth/decorators/gql.user.decorator";
import { GqlJwtGuard } from "../auth/guards/gql.jwt.guard";
import { UseGuards } from "@nestjs/common";
import { Roles } from "../auth/decorators/roles.decorator";
import { Role } from "../auth/roles.enum";


@Resolver(of => Profile)
export class ProfileResolver{
    constructor(private profileService:ProfileService, @InjectMapper() private readonly classMapper: Mapper){}


    @Query(returns => Profile, {name:"findProfileByID"})
    async findProfileByID(@Args("profileID") profileID:string):Promise<Profile>{
        return this.classMapper.mapAsync(await this.profileService.findOne(profileID as any), ProfileSchema, Profile);
    }

    @Query(returns => [Profile], {name:"findProfileByQuery"})
    async findProfileByQuery(@Args("query") query:QueryProfileInput):Promise<Profile[]>{
        return this.classMapper.mapArrayAsync(await this.profileService.find(query as unknown), ProfileSchema, Profile);
    }

    // @Mutation(returns => Profile, {name:"createProfile"})
    // async createProfile(@Args("profile") profile:CreateProfileInput):Promise<Profile>{
    //     const queryMap = await this.classMapper.mapAsync(profile, CreateProfileInput, ProfileSchema)
    //     return await this.classMapper.mapAsync(await this.profileService.create(queryMap), ProfileSchema, Profile);
    // }

    @Mutation(returns => Boolean, {name:"updateProfile"})
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    async updateProfile(
        @GqlCurrentUser() profileID:any,
        @Args("profile") profile:QueryProfileInput
    ){
        const queryMap = await this.classMapper.mapAsync(profile, QueryProfileInput, ProfileSchema)
        await this.profileService.updateOne(profileID.profile, queryMap)
        return true;
    }

    // @Query(returns => Boolean, {name: "deleteProfile"})
    // async deleteProfile(@Args("id") id:string):Promise<Boolean>{
    //     await this.profileService.deleteOne(id)
    //     return true;
    // }

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