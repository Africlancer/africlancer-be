import { Args, Mutation, Parent, Query, Resolver, ResolveField } from "@nestjs/graphql";
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { EducationInput, ExperienceInput, Profile, PublicationInput, QualificationInput, QueryProfileInput, Review, ReviewInput } from "./profile.model";
import { ProfileService } from "./profile.service";
import { Education as EducationSchema, Profile as ProfileSchema } from "./profile.schema";
import { GqlCurrentUser } from "../auth/decorators/gql.user.decorator";
import { GqlJwtGuard } from "../auth/guards/gql.jwt.guard";
import { UseGuards } from "@nestjs/common";
import { Roles } from "../auth/decorators/roles.decorator";
import { Role } from "../auth/roles.enum";
import { User } from "../user/user.model";


@Resolver(of => Profile)
export class ProfileResolver{
    constructor(private profileService:ProfileService, @InjectMapper() private readonly classMapper: Mapper){}


    @Query(returns => Profile, {name:"findOneProfile"})
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    async findOne(@GqlCurrentUser() profileID:any):Promise<Profile>{
        return this.classMapper.mapAsync(await this.profileService.findOne({_id:profileID.sub} as unknown), ProfileSchema, Profile);
    }

    @Query(returns => [Profile], {name:"findProfiles"})
    async find(@Args("query") query:QueryProfileInput):Promise<Profile[]>{
        return this.classMapper.mapArrayAsync(await this.profileService.find(query as unknown), ProfileSchema, Profile);
    }

    @Mutation(returns => Boolean, {name:"updateProfile"})
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    async updateProfile(
        @GqlCurrentUser() profileID:any,
        @Args("profile") profile:QueryProfileInput
    ){
        const queryMap = await this.classMapper.mapAsync(profile, QueryProfileInput, ProfileSchema)
        await this.profileService.updateOne(profileID.sub, queryMap)
        return true;
    }

    @Mutation(returns => Boolean, {name:"addOrUpdateEducation"})
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    async addOrUpdateEducation(@GqlCurrentUser() profileID:any, @Args("education") education:EducationInput){
        await this.profileService.addOrUpdateEducation(education as any, profileID.sub)
        return true;
    }

    @Mutation(returns => Boolean, {name:"deleteEducation"})
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    async deleteEducation(@GqlCurrentUser() profileID:any, @Args("educationID") educationID:string){
        await this.profileService.deleteEducation(educationID , profileID.sub)
        return true;
    }

    @Mutation(returns => Boolean, {name:"addOrUpdateExperience"})
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    async addOrUpdateExperience(@GqlCurrentUser() profileID:any, @Args("experience") experience:ExperienceInput){
        await this.profileService.addOrUpdateExperience(experience as any, profileID.sub)
        return true;
    }

    @Mutation(returns => Boolean, {name:"deleteExperience"})
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    async deleteExperience(@GqlCurrentUser() profileID:any, @Args("experienceID") experienceID:string){
        await this.profileService.deleteExperience(experienceID , profileID.sub)
        return true;
    }

    @Mutation(returns => Boolean, {name:"addOrUpdateQualification"})
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    async addOrUpdateQualification(@GqlCurrentUser() profileID:any, @Args("qualification") qualification:QualificationInput){
        await this.profileService.addOrUpdateQualification(qualification as any, profileID.sub)
        return true;
    }

    @Mutation(returns => Boolean, {name:"deleteQualification"})
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    async deleteQualification(@GqlCurrentUser() profileID:any, @Args("qualificationID") qualificationID:string){
        await this.profileService.deleteQualification(qualificationID , profileID.sub)
        return true;
    }

    @Mutation(returns => Boolean, {name:"addOrUpdatePublication"})
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    async addOrUpdatePublication(@GqlCurrentUser() profileID:any, @Args("publication") publication:PublicationInput){
        await this.profileService.addOrUpdatePublication(publication as any, profileID.sub)
        return true;
    }

    @Mutation(returns => Boolean, {name:"deletePublication"})
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    async deletePublication(@GqlCurrentUser() profileID:any, @Args("publicationID") publicationID:string){
        await this.profileService.deletePublication(publicationID , profileID.sub)
        return true;
    }

    @ResolveField(returns => User)
    async user(@Parent() profile:Profile):Promise<any>{
        return this.profileService.finduser(profile.userID);
    }

    @Query((returns) => [Profile], { name: 'findProfilesFilter' })
    public async findFilter(@Args('query') query: QueryProfileInput, @Args('fullSearch') fullSearch: Boolean ): Promise<Profile[]> {
      return this.classMapper.mapArrayAsync(await this.profileService.findFilter(query as unknown, fullSearch), ProfileSchema, Profile);
    }

    @Mutation(returns => Boolean, {name:"reviewProfile"})
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    async reviewProfile(@GqlCurrentUser() user:any, @Args("revieweeID") revieweeID:string, @Args("projectID") projectID:string, @Args("review") review:ReviewInput){
        await this.profileService.reviewProfile(review as any, revieweeID, projectID, user.sub);
        return true;
    }

    @Mutation(returns => Boolean, {name:"deleteReview"})
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    async deleteReview(@Args("reviewID") reviewID:string, @Args("revieweeID") revieweeID:string){
        await this.profileService.deleteReview(reviewID , revieweeID);
        return true;
    }
}