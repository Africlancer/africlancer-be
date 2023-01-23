import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { AutoMap } from "@automapper/classes";

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
}

@InputType()
export class QueryProfileInput extends CommonProfileInput{}