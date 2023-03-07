import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ForbiddenError } from 'apollo-server-express';
import { Types } from 'mongoose';
import { ProjectStatus } from '../projects/project.enum';
import { ProjectRepository } from '../projects/project.repository';
import { BidRepository } from './bid.repository';
import { Bid } from './bid.schema';

@Injectable()
export class BidService {
    constructor(private readonly bidRepo:BidRepository, private readonly projectRepo:ProjectRepository){}

    async find(bid:Partial<Bid>):Promise<Bid[]>{
        return this.bidRepo.find(bid);
    }

    async findOne( bid:Partial<Bid>):Promise<Bid>{
        return this.bidRepo.findOne(bid);
    }

    async create(userId:string, bid:Bid):Promise<Bid>{
        const project = await this.projectRepo.findOne({_id: bid.projectID})
        if(!project){
            throw new HttpException("Project does not exist", HttpStatus.NOT_FOUND)
        }else if(project.status != ProjectStatus.BIDDING_OPEN){
            throw new ForbiddenException("Project not open to bidding")
        }else if(await this.bidRepo.findOne({userID:new Types.ObjectId(userId), projectID:new Types.ObjectId(bid.projectID)})){
            throw new ForbiddenException("Already bidded for this project")
        }
        return this.bidRepo.create(bid); 
    }

    async update(id:string, bid:Partial<Bid>):Promise<void>{
        await this.bidRepo.update(id, bid);
    }

    async delete(id:string):Promise<void>{
        await this.bidRepo.delete(id);
    }

    async award(userId:string, projectId:string, bidId:string):Promise<void>{
        const bid_id = new Types.ObjectId(bidId);
        const project_id = new Types.ObjectId(projectId);
        
        const project = await this.projectRepo.findOne({userId: new Types.ObjectId(userId), _id: project_id});
        if(!project){
            throw new ForbiddenError("Invalid user, can't award this project");
        }
        const bid = await this.bidRepo.findOne({_id: bid_id, projectID:project._id});
        if(!bid){
            throw new HttpException("Cannot find bid", HttpStatus.NOT_FOUND);
        }

        await this.bidRepo.update(bidId, {isAwarded:true}).then(()=>{
            this.projectRepo.updateOne(project._id.toString(), {status: ProjectStatus.BIDDING_CLOSE})
        })
    }

    async unaward(userId:string, projectId:string, bidId:string):Promise<void>{
        const bid_id = new Types.ObjectId(bidId);
        const project_id = new Types.ObjectId(projectId);
        const project = await this.projectRepo.findOne({userId: new Types.ObjectId(userId), _id: project_id});
        if(!project){
            throw new ForbiddenError("Invalid user, can't unaward this project");
        }
        const bid = await this.bidRepo.findOne({_id: bid_id, projectID:project._id});
        if(!bid){
            throw new HttpException("Cannot find bid", HttpStatus.NOT_FOUND);
        }
        await this.bidRepo.update(bidId, {isAwarded:false}).then(()=>{
            this.projectRepo.updateOne(project._id.toString(), {status: ProjectStatus.BIDDING_OPEN})
        })
    }

    //TODO: Team project bidding(more than 1 accepted bidder)
    //TODO: set project status to completed => payment occurs
    
}
