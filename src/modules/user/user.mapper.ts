import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateUserInput, QueryUserInput, User as UserModel } from './user.model';
import { User as UserSchema } from './user.schema';

@Injectable()
export class UserMapper extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    get profile() {
        return (mapper) => {
            createMap(mapper, UserSchema, UserModel, 
                forMember((dest) => dest._id, 
                mapFrom(src => src._id.toString())
                )
            )
            createMap(mapper, QueryUserInput, UserSchema)
            createMap(mapper, QueryUserInput, UserModel)
            createMap(mapper, CreateUserInput, UserSchema)
        };
    }
}