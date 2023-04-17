import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { AutoMap } from "@automapper/classes";


@ObjectType()
export class Qualification{
    @AutoMap()
    @Field()
    _id:string;
    
    @AutoMap()
    @Field({ nullable: true })
    title?:string;

    @AutoMap()
    @Field({ nullable: true })
    conferringOrganization?:string;

    @AutoMap()
    @Field({ nullable: true })
    summary?:string;
    
    @AutoMap()
    @Field({ nullable: true })
    startYear?:number;

    @AutoMap()
    @Field()
    profileId:string;
}

@InputType()
export class QualificationInput{
    @AutoMap()
    @Field({ nullable: true })
    _id?:string;
    
    @AutoMap()
    @Field({ nullable: true })
    title?:string;

    @AutoMap()
    @Field({ nullable: true })
    conferringOrganization?:string;

    @AutoMap()
    @Field({ nullable: true })
    summary?:string;
    
    @AutoMap()
    @Field({ nullable: true })
    startYear?:number;
}

@ObjectType()
export class Experience{
    @AutoMap()
    @Field()
    _id:string;

    @AutoMap()
    @Field({ nullable: true })
    title?:string;

    @AutoMap()
    @Field({ nullable: true })
    company?:string;

    @AutoMap()
    @Field({ nullable: true })
    startMonth?:string;
    
    @AutoMap()
    @Field({ nullable: true })
    startYear?:number;

    @AutoMap()
    @Field({ nullable: true })
    endMonth?:string;

    @AutoMap()
    @Field({ nullable: true })
    endYear?:number;

    @AutoMap()
    @Field({ nullable: true })
    working?:boolean;

    @AutoMap()
    @Field({ nullable: true })
    summary?:string;

    @AutoMap()
    @Field()
    profileId:string;
}

@InputType()
export class ExperienceInput{
    @AutoMap()
    @Field({ nullable: true })
    _id?:string;

    @AutoMap()
    @Field({ nullable: true })
    title?:string;

    @AutoMap()
    @Field({ nullable: true })
    company?:string;

    @AutoMap()
    @Field({ nullable: true })
    startMonth?:string;
    
    @AutoMap()
    @Field({ nullable: true })
    startYear?:number;

    @AutoMap()
    @Field({ nullable: true })
    endMonth?:string;

    @AutoMap()
    @Field({ nullable: true })
    endYear?:number;

    @AutoMap()
    @Field({ nullable: true })
    working?:boolean;

    @AutoMap()
    @Field({ nullable: true })
    summary?:string;
}


@ObjectType()
export class Publication{
    @AutoMap()
    @Field()
    _id:string;

    @AutoMap()
    @Field({ nullable: true })
    title?:string;

    @AutoMap()
    @Field({ nullable: true })
    publisher?:string;

    @AutoMap()
    @Field({ nullable: true })
    summary?:string;

    @AutoMap()
    @Field()
    profileId:string;
}

@InputType()
export class PublicationInput{
    @AutoMap()
    @Field({ nullable: true })
    _id?:string;

    @AutoMap()
    @Field({ nullable: true })
    title?:string;

    @AutoMap()
    @Field({ nullable: true })
    publisher?:string;

    @AutoMap()
    @Field({ nullable: true })
    summary?:string;
}

@ObjectType()
export class Education{
    @AutoMap()
    @Field()
    _id:string;

    @AutoMap()
    @Field({ nullable: true })
    country?:string;

    @AutoMap()
    @Field({ nullable: true })
    insitution?:string;

    @AutoMap()
    @Field({ nullable: true })
    degree?:string;
    
    @AutoMap()
    @Field({ nullable: true })
    startYear?:number;

    @AutoMap()
    @Field({ nullable: true })
    endYear?:number;

    @AutoMap()
    @Field()
    profileId:string;
}

@InputType()
export class EducationInput{
    @AutoMap()
    @Field({ nullable: true })
    _id?:string;

    @AutoMap()
    @Field({ nullable: true })
    country?:string;

    @AutoMap()
    @Field({ nullable: true })
    insitution?:string;

    @AutoMap()
    @Field({ nullable: true })
    degree?:string;
    
    @AutoMap()
    @Field({ nullable: true })
    startYear?:number;

    @AutoMap()
    @Field({ nullable: true })
    endYear?:number;
}

@ObjectType()
export class Profile{
    @AutoMap()
    @Field()
    _id:string;

    @AutoMap()
    @Field()
    userID:string;

    @AutoMap()
    @Field({ nullable: true })
    avatar?:string;

    @AutoMap()
    @Field({ nullable: true })
    banner?:string;

    @AutoMap()
    @Field({ nullable: true })
    location?:string;

    @AutoMap()
    @Field({ nullable: true })
    hourlyRate?:number;

    @AutoMap()
    @Field({ nullable: true })
    professionalHeadline?:string;

    @AutoMap()
    @Field({ nullable: true })
    summary?:string;

    @AutoMap()
    @Field({ nullable: true })
    recommendations?:number;

    @Field({ nullable: true })
    createdAt?:Date;

    @Field({ nullable: true })
    updatedAt?:Date;

    @AutoMap()
    @Field(type=>[Education], { nullable: true })
    education?:Education[];

    @AutoMap()
    @Field(type=>[Experience], { nullable: true })
    experience?:Experience[];

    @AutoMap()
    @Field(type=>[Qualification], { nullable: true })
    qualification?:Qualification[];

    @AutoMap()
    @Field(type=>[Publication], { nullable: true })
    publication?:Publication[];

    @AutoMap()
    @Field(type => [String], { nullable: true })
    skills?: String[];

    @AutoMap()
    @Field({})
    clientRating: number;

    @AutoMap()
    @Field({})
    freelancerRating: number;
    
    @AutoMap()
    @Field({})
    flagURL: string;

    @AutoMap()
    @Field({ nullable: true })
    fullName?: string;
}

@InputType()
export class CreateProfileInput{
    @AutoMap()
    @Field()
    userID:string;

    @AutoMap()
    @Field({ nullable: true })
    avatar?:string;

    @AutoMap()
    @Field({ nullable: true })
    banner?:string;

    @AutoMap()
    @Field({ nullable: true })
    location?:string;

    @AutoMap()
    @Field({ nullable: true })
    hourlyRate?:number;

    @AutoMap()
    @Field({ nullable: true })
    professionalHeadline?:string;

    @AutoMap()
    @Field({ nullable: true })
    summary?:string;

    @AutoMap()
    @Field({ nullable: true })
    recommendations?:number;

    @AutoMap()
    @Field({nullable: true})
    flagURL?: string;


    // @AutoMap()
    // @Field({ nullable: true })
    // fullName?: string;

    // @AutoMap()
    // @Field(type => [String], { nullable: true })
    // skills?: String[];
}

@InputType()
export class CommonProfileInput{
    @AutoMap()
    @Field({ nullable: true })
    _id?:string;

    @AutoMap()
    @Field({ nullable: true })
    userID?:string;

    @AutoMap()
    @Field({ nullable: true })
    avatar?:string;

    @AutoMap()
    @Field({ nullable: true })
    banner?:string;

    @AutoMap()
    @Field({ nullable: true })
    location?:string;

    @AutoMap()
    @Field({ nullable: true })
    hourlyRate?:number;

    @AutoMap()
    @Field({ nullable: true })
    professionalHeadline?:string;

    @AutoMap()
    @Field({ nullable: true })
    summary?:string;

    @AutoMap()
    @Field({ nullable: true })
    recommendations?:number;

    @AutoMap()
    @Field(type => [String], { nullable: true })
    skills?: String[];

    @AutoMap()
    @Field({ nullable: true })
    fullName?: string;

    @AutoMap()
    @Field({ nullable: true })
    clientRating: number;

    @AutoMap()
    @Field({ nullable: true })
    freelancerRating: number;
    
    @AutoMap()
    @Field({ nullable: true })
    flagURL: string;
}

@InputType()
export class QueryProfileInput extends CommonProfileInput{}