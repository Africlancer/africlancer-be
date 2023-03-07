import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BidRepository } from "./bid.repository";
import { Bid, BidSchema } from "./bid.schema";
import { BidService } from './bid.service';
import { BidResolver } from './bid.resolver';
import { ProjectModule } from "../projects/project.module";

@Module({
    imports:[MongooseModule.forFeature([{name:Bid.name, schema:BidSchema}]), ProjectModule],
    providers:[BidService, BidRepository, BidResolver],
    exports:[]
})
export class BidModule{}