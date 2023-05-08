import { Field, InputType, ObjectType, PartialType } from "@nestjs/graphql";

@ObjectType()
export class Bookmark{
    @Field()
    _id: string;

    @Field()
    userID: string;

    @Field()
    projectID: string;
}

@InputType()
export class CreateBookmarkInput{
    @Field()
    userID: string;

    @Field()
    projectID: string;
}


@InputType()
export class QueryBookMarkInput{
    @Field({nullable:true})
    userID?: string;

    @Field({nullable:true})
    projectID?: string;
}


