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