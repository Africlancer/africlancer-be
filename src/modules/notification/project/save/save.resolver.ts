import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { Query } from "@nestjs/graphql";
import { CreateSaveProjectNotificationInput, QuerySaveProjectNotificationInput, SaveProjectNotification } from "./save.model";
import { GqlJwtGuard } from "src/modules/auth/guards/gql.jwt.guard";
import { Roles } from "src/modules/auth/decorators/roles.decorator";
import { Role } from "src/modules/auth/roles.enum";
import { SaveProjectNotificationService } from "./save.service";
import { GqlCurrentUser } from "src/modules/auth/decorators/gql.user.decorator";

@Resolver(of => SaveProjectNotification)
export class SaveProjectNotificationResolver{
    constructor(private notificationService: SaveProjectNotificationService){}

    @Mutation(returns => Boolean, {name:"saveProjectNotification"})
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    async create(@Args("notification") notification:CreateSaveProjectNotificationInput):Promise<Boolean>{
        await this.notificationService.create(notification as any);
        return true;
    }

    @Query(returns => Notification, {name:"findOneSavedNotification"})
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    async findOne(@Args("notification") notification: QuerySaveProjectNotificationInput, @GqlCurrentUser() user: any): Promise<SaveProjectNotification>{
        const notifications = {...notification, userId: user._id} as any;
        return this.notificationService.findOne(notifications) as any;
    }
    
    @Query(returns => [Notification], {name:"findSavedNotifications"})
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    async find(@Args("notification") notification: QuerySaveProjectNotificationInput, @GqlCurrentUser() user: any): Promise<SaveProjectNotification[]>{
        const notifications = {...notification, userId: user._id} as any;
        return this.notificationService.find(notifications) as any;
    }

    @Mutation(returns => Boolean, {name:"deleteSavedNotification"})
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    async delete(@Args("userId") userId:string):Promise<Boolean>{
        await this.notificationService.delete(userId);
        return true;
    }
}