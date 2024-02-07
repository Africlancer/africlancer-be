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

@InputType()
export class BookmarkPageInput {
  @Field((type) => Number, { nullable: false })
  skip: number;
  @Field((type) => Number, { nullable: false })
  limit: number;
  @Field((type) => String, { nullable: true })
  keyword: string;
}

@ObjectType()
export class BookmarkPageResult {
  @Field((type) => Number, { nullable: false })
  totalRecords: number;
  @Field((type) => [Bookmark])
  data: [Bookmark];
}


