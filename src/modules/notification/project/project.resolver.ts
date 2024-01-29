import { Args, Query, Mutation, Resolver, Subscription } from "@nestjs/graphql";
import { CreateProjectNotificationInput, ProjectNotification, QueryProjectNotificationInput } from "./project.model";
import { ProjectNotificationService } from "./project.service";
import { PubSub } from "graphql-subscriptions";
import { Inject } from "@nestjs/common";
import { PUB_SUB } from "src/modules/pubsub/pubsub.module";
import { SubscriptionEvents } from "src/modules/pubsub/pubsub.enum";



@Resolver(of => ProjectNotification)
export class ProjectNotificationResolver{
    constructor(
        private notificationService: ProjectNotificationService, 
        @Inject(PUB_SUB) private readonly pubSub: PubSub
    ){}

    @Mutation(returns => ProjectNotification, {name:"createProjectNotification"})
    async create(@Args("notification") notification:CreateProjectNotificationInput):Promise<ProjectNotification>{
        return this.notificationService.create(notification as any) as any;
    }

    @Query(returns => ProjectNotification, {name:"findOneProjectNotification"})
    async findOne(@Args("notification") notification: QueryProjectNotificationInput): Promise<ProjectNotification>{
        return this.notificationService.findOne(notification as any) as any;
    }
    @Query(returns => [ProjectNotification], {name:"findProjectNotifications"})
    async find(@Args("notification") notification: QueryProjectNotificationInput): Promise<ProjectNotification[]>{
        return this.notificationService.find(notification as any) as any;
    }

    @Subscription((returns) => ProjectNotification)
    [SubscriptionEvents.NEW_PROJECT](){
        return this.pubSub.asyncIterator(SubscriptionEvents.NEW_PROJECT);
    }

    // @Mutation(returns => Boolean, {name:"deleteProjectNotifications"})
    // async delete(@Args("projectId") projectId:string):Promise<Boolean>{
    //     await this.notificationService.delete(projectId);
    //     return true;
    // }
}