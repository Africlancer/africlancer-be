import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/modules/auth/auth.module";
import { ProjectModule } from "src/modules/projects/project.module";
import { ProjectNotification, ProjectNotificationSchema } from "./project.schema";
import { ProjectNotificationRepository } from "./project.repository";
import { ProjectNotificationService } from "./project.service";
import { ProjectNotificationResolver } from "./project.resolver";

@Module({
    imports:[
        MongooseModule.forFeature([{name:ProjectNotification.name, schema:ProjectNotificationSchema}]),
        ProjectModule,
        AuthModule
    ],
    providers:[ProjectNotificationRepository, ProjectNotificationService, ProjectNotificationResolver],
    exports:[ProjectNotificationRepository, ProjectNotificationService]
})
export class ProjectNotificationModule{}