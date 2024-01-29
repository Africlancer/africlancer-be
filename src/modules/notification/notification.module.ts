import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Notification, NotificationSchema } from "./notification.schema";
import { UserModule } from "../user/user.module";
import { NotificationRepository } from "./notification.repository";
import { NotificationService } from "./notification.service";
import { AuthModule } from "../auth/auth.module";
import { ProjectNotificationModule } from "./project/project.module";

@Module({
    imports:[
        MongooseModule.forFeature([{name:Notification.name, schema:NotificationSchema}]),
        UserModule,
        AuthModule,
        ProjectNotificationModule
    ],
    providers:[NotificationRepository, NotificationService],
    exports:[]
})
export class NotificationModule{}