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