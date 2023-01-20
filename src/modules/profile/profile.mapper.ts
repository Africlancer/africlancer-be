import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, ignore, mapFrom, Mapper, MappingProfile, typeConverter } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateProfileInput, QueryProfileInput, Profile as ProfileModel } from './profile.model';
import { Profile as ProfileSchema } from './profile.schema';
import { Types } from 'mongoose';

@Injectable()
export class ProfileMapper extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    get profile(): MappingProfile {
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
            createMap(mapper, ProfileSchema, QueryProfileInput, 
                forMember((dest) => dest.userID, 
                mapFrom(src => src.userID.toString())
                )
            )
        };
    }
}