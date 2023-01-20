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
    createdAt?:string;

    @Field({ nullable: true })
    updatedAt?:string;
}

@InputType()
export class CreateProfileInput{
    @Field()
    userID:string;

    @Field({ nullable: true })
    avatar?:string;

    @Field({ nullable: true })
    hourlyRate?:number;

    @Field({ nullable: true })
    professionalHeadline?:string;

    @Field({ nullable: true })
    summary?:string;

    @Field({ nullable: true })
    recommendations?:number;

    @Field({ nullable: true })
    createdAt?:string;

    @Field({ nullable: true })
    updatedAt?:string;
}

@InputType()
export class QueryInput{
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
export class QueryProfileInput extends QueryInput{}