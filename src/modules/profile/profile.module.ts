import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProfileMapper } from "./profile.mapper";
import { ProfileRepository } from "./profile.repository";
import { ProfileResolver } from "./profile.resolver";
import { Profile, ProfileSchema } from "./profile.schema";
import { ProfileService } from "./profile.service";
import { UserModule } from "../user/user.module";
import { ProjectModule } from "../projects/project.module";

@Module({
    imports:[MongooseModule.forFeature([{name:Profile.name, schema:ProfileSchema}]), UserModule, ProjectModule],
    providers:[ProfileService,ProfileResolver,ProfileRepository, ProfileMapper],
    exports:[ProfileService, ProfileRepository]
})
export class ProfileModule{}