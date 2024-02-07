import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ProjectNotification{
    @Field((type)=>ID)
    _id: string;

    @Field((type)=>ID)
    projectId: string;

    @Field({nullable: true})
    createdAt?: number;
}

@InputType()
export class CommonProjectNotificationInput{
    @Field((type)=>ID, {nullable: true})
    _id?: string;

    @Field((type)=>ID, {nullable: true})
    projectId?: string;
}

@InputType()
export class CreateProjectNotificationInput{
     @Field((type)=>ID)
    projectId: string;
}

@InputType()
export class QueryProjectNotificationInput extends CommonProjectNotificationInput{}

@InputType()
export class ProjectNotificationPageInput {
  @Field((type) => Number, { nullable: false })
  skip: number;
  @Field((type) => Number, { nullable: false })
  limit: number;
  @Field((type) => String, { nullable: true })
  keyword: string;
}

@ObjectType()
export class ProjectNotificationPageResult {
  @Field((type) => Number, { nullable: false })
  totalRecords: number;
  @Field((type) => [ProjectNotification])
  data: [ProjectNotification];
}