import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper, MappingProfile, typeConverter } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreatePortfolioInput, QueryPortfolioInput, Portfolio as PortfolioModel } from './portfolio.model';
import { Portfolio as PortfolioSchema } from './portfolio.schema';
import { Types } from 'mongoose';

@Injectable()
export class PortfolioMapper extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    get profile() {
        return (mapper) => {
            createMap(mapper, PortfolioSchema, PortfolioModel, 
                forMember((dest) => dest._id, 
                mapFrom(src => src._id.toString())
                )
            )
            createMap(mapper, QueryPortfolioInput, PortfolioSchema)
            createMap(mapper, QueryPortfolioInput, PortfolioModel)
            createMap(mapper, CreatePortfolioInput, PortfolioSchema)
        };
    }
}