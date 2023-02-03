import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, ignore, mapFrom, Mapper, MappingProfile, typeConverter } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateProfileInput, QueryProfileInput, Profile as ProfileModel, EducationInput } from './profile.model';
import { Profile as ProfileSchema , Education as EducationSchema} from './profile.schema';
import { Types } from 'mongoose';

@Injectable()
export class ProfileMapper extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    get profile() {
        return (mapper) => {
            createMap(mapper, ProfileSchema, ProfileModel, 
                //typeConverter(String, Types.ObjectId, (String) => new Types.ObjectId(String)),
                forMember((dest) => dest._id, 
                mapFrom(src => src._id.toString())
                ),
                forMember((dest) => dest.userID, 
                mapFrom(src => src.userID.toString())
                )
            )
            createMap(mapper, QueryProfileInput, ProfileSchema)
            createMap(mapper, CreateProfileInput, ProfileSchema)
            createMap(mapper, EducationInput, EducationSchema)
        };
    }
}