import { Field, InputType, ObjectType, PartialType } from "@nestjs/graphql";

@ObjectType()
export class Bid{
    @Field()
    _id: string;

    @Field()
    userID: string;

    @Field()
    projectID: string;

    @Field()
    proposal: string;

    @Field({nullable:true})
    isAwarded?: boolean;

    @Field({nullable:true})
    budget?: number;

    @Field({nullable:true})
    hourlyRate?: number;

    @Field()
    deliveredIn: number;
}

@InputType()
export class CreateBidInput{
    @Field({nullable:true})
    userID?: string;

    @Field()
    projectID: string;

    @Field()
    proposal: string;

    @Field({nullable:true})
    budget?: number;

    @Field({nullable:true})
    hourlyRate?: number;

    @Field()
    deliveredIn: number;
}

@InputType()
export class CommonBidInput{
    @Field({nullable:true})
    userID?: string;
    
    @Field({nullable:true})
    projectID?: string;

    @Field({nullable:true})
    proposal?: string;

    @Field({nullable:true})
    budget?: number;

    @Field({nullable:true})
    hourlyRate?: number;

    @Field({nullable:true})
    deliveredIn?: number;

    @Field({nullable:true})
    isAwarded?: boolean;
}

@InputType()
export class QueryBidInput extends PartialType(CommonBidInput){}


