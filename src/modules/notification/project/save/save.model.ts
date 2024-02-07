import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SaveProjectNotification{
    @Field((type)=>ID)
    _id: string;

    @Field((type)=>ID)
    userId: string;

    @Field((type)=>ID)
    notificationId: string;
}

@InputType()
export class CommonSaveProjectNotificationInput{
    @Field((type)=>ID, {nullable: true})
    _id?: string;

    // @Field((type)=>ID, {nullable: true})
    // userId?: string;

    @Field((type)=>ID, {nullable: true})
    notificationId?: string;
}

@InputType()
export class CreateSaveProjectNotificationInput{
    // @Field((type)=>ID)
    // userId: string;

    @Field((type)=>ID)
    notificationId: string;

    @Field({})
    message: string;
}

@InputType()
export class QuerySaveProjectNotificationInput extends CommonSaveProjectNotificationInput{}

@InputType()
export class SaveProjectNotificationPageInput {
  @Field((type) => Number, { nullable: false })
  skip: number;
  @Field((type) => Number, { nullable: false })
  limit: number;
  @Field((type) => String, { nullable: true })
  keyword: string;
}

@ObjectType()
export class SaveProjectNotificationPageResult {
  @Field((type) => Number, { nullable: false })
  totalRecords: number;
  @Field((type) => [SaveProjectNotification])
  data: [SaveProjectNotification];
}