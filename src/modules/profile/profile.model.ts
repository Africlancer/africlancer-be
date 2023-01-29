import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { AutoMap } from "@automapper/classes";

@ObjectType()
export class Education{
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

@InputType()
export class EducationInput{
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
    @Field(type=>[EducationInput], { nullable: true })
    education?:EducationInput[];
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
    @Field(type=>[EducationInput], { nullable: true })
    education?:EducationInput[];
}

@InputType()
export class QueryProfileInput extends CommonProfileInput{}