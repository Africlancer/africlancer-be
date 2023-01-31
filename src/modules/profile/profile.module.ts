import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProfileMapper } from "./profile.mapper";
import { ProfileRepository } from "./profile.repository";
import { ProfileResolver } from "./profile.resolver";
import { Profile, ProfileSchema } from "./profile.schema";
import { ProfileService } from "./profile.service";

@Module({
    imports:[MongooseModule.forFeature([{name:Profile.name, schema:ProfileSchema}])],
    providers:[ProfileService,ProfileResolver,ProfileRepository, ProfileMapper],
    exports:[ProfileService, ProfileRepository]
})
export class ProfileModule{}