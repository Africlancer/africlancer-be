import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { CreateProfileInput, Profile, QueryProfileInput } from "./profile.model";
import { ProfileService } from "./profile.service";
import { Profile as ProfileSchema } from "./profile.schema";


@Resolver(of => Profile)
export class ProfileResolver{
    constructor(private profileService:ProfileService, @InjectMapper() private readonly classMapper: Mapper){}


    @Query(returns => Profile, {name:"findProfileByID"})
    async findProfileByID(@Args("profileID") profileID:string):Promise<Profile>{
        return this.classMapper.mapAsync(await this.profileService.findOne(profileID), ProfileSchema, Profile);
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
}