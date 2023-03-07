import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper, MappingProfile, typeConverter } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateProjectInput, QueryProjectInput, Project as ProjectModel } from './project.model';
import { Project as ProjectSchema } from './project.schema';
import { Types } from 'mongoose';

@Injectable()
export class ProjectMapper extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    get profile() {
        return (mapper) => {
            createMap(mapper, ProjectSchema, ProjectModel, 
                forMember((dest) => dest._id, 
                mapFrom(src => src._id.toString())
                ),
                forMember((dest) => dest.userId, 
                mapFrom(src => src.userId.toString())
                )
            )
            createMap(mapper, QueryProjectInput, ProjectSchema)
            createMap(mapper, QueryProjectInput, ProjectModel)
            createMap(mapper, CreateProjectInput, ProjectSchema)
        };
    }
}