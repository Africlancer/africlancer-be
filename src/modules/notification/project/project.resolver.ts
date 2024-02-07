import { Args, Query, Mutation, Resolver, Subscription } from "@nestjs/graphql";
import { CreateProjectNotificationInput, ProjectNotification, ProjectNotificationPageInput, ProjectNotificationPageResult, QueryProjectNotificationInput } from "./project.model";
import { ProjectNotificationService } from "./project.service";
import { PubSub } from "graphql-subscriptions";
import { Inject, UseGuards } from "@nestjs/common";
import { PUB_SUB } from "src/modules/pubsub/pubsub.module";
import { SubscriptionEvents } from "src/modules/pubsub/pubsub.enum";
import { Roles } from "src/modules/auth/decorators/roles.decorator";
import { GqlJwtGuard } from "src/modules/auth/guards/gql.jwt.guard";
import { Role } from "src/modules/auth/roles.enum";



@Resolver(of => ProjectNotification)
export class ProjectNotificationResolver{
    constructor(
        private notificationService: ProjectNotificationService, 
        @Inject(PUB_SUB) private readonly pubSub: PubSub
    ){}

    @Mutation(returns => ProjectNotification, {name:"createProjectNotification"})
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    async create(@Args("notification") notification:CreateProjectNotificationInput):Promise<ProjectNotification>{
        return this.notificationService.create(notification as any) as any;
    }

    @Query(returns => ProjectNotification, {name:"findOneProjectNotification"})
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    async findOne(@Args("notification") notification: QueryProjectNotificationInput): Promise<ProjectNotification>{
        return this.notificationService.findOne(notification as any) as any;
    }
    @Query(returns => [ProjectNotification], {name:"findProjectNotifications"})
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
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

    @Query((returns) => ProjectNotificationPageResult, { name: 'projectNotificationPage' })
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    public async page(@Args('query') query: QueryProjectNotificationInput, @Args("page") page: ProjectNotificationPageInput) {
      return this.notificationService.page(query as any, page);
    }
}