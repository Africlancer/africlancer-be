import { MapInterceptor } from "@automapper/nestjs";
import { UseInterceptors } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateProfileInput, Profile, QueryProfileInput, QueryInput } from "./profile.model";
import { ProfileService } from "./profile.service";
import { Profile as ProfileSchema } from "./profile.schema";

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';



@Resolver(of => Profile)
export class ProfileResolver{
    constructor(private profileService:ProfileService, @InjectMapper() private readonly classMapper: Mapper){}


    @Query(returns => Profile, {name:"findProfileByID"})
    //@UseInterceptors(MapInterceptor(ProfileSchema, Profile))
    async findProfileByID(@Args("profileID") profileID:string):Promise<Profile>{
        return this.classMapper.mapAsync(await this.profileService.findOne(profileID), ProfileSchema, Profile);
        //return this.profileService.findOne(profileID)
    }

    @Query(returns => [Profile], {name:"findProfileByQuery"})
    async findProfileByQuery(@Args("query") query:QueryProfileInput):Promise<Profile[]>{
        const queryMap = await this.classMapper.mapAsync(query, QueryProfileInput, ProfileSchema)
        return this.classMapper.mapArrayAsync(await this.profileService.find(queryMap), ProfileSchema, Profile);
        //return (this.profileService.find(query as any)) as any
    }

    @Mutation(returns => Profile, {name:"createProfile"})
    async createProfile(@Args("profile") profile:CreateProfileInput):Promise<Profile>{
        return (await this.profileService.create(profile as any)) as any
    }

    @Mutation(returns => Boolean, {name:"updateProfile"})
    async updateProfile(
        @Args("profileID")
        profileID:string,
        @Args("profile")
        profile:QueryProfileInput
    ){
        await this.profileService.updateOne(profileID, profile as any)
        return true;
    }

    @Query(returns => Boolean, {name: "deleteProfile"})
    async deleteProfile(@Args("id") id:string):Promise<Boolean>{
        await this.profileService.deleteOne(id)
        return true;
    }
}