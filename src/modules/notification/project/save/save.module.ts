import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/modules/auth/auth.module";
import { UserModule } from "src/modules/user/user.module";
import { SaveProjectNotification, SaveProjectNotificationSchema } from "./save.schema";
import { SaveProjectNotificationRepository } from "./save.repository";
import { SaveProjectNotificationService } from "./save.service";
import { SaveProjectNotificationResolver } from "./save.resolver";
import { ProjectNotificationModule } from "../project.module";

@Module({
    imports:[
        MongooseModule.forFeature([{name:SaveProjectNotification.name, schema:SaveProjectNotificationSchema}]),
        UserModule,
        AuthModule,
        ProjectNotificationModule
    ],
    providers:[SaveProjectNotificationRepository, SaveProjectNotificationService, SaveProjectNotificationResolver],
    exports:[SaveProjectNotificationRepository, SaveProjectNotificationService]
})
export class SaveProjectNotificationModule{}