import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { ProjectStatus } from '../projects/project.enum';
import { ProjectService } from '../projects/project.service';
import { BidRepository } from './bid.repository';
import { Bid } from './bid.schema';
import { User } from '../user/user.schema';
import { UserService } from '../user/user.service';

@Injectable()
export class BidService {
    constructor(private readonly bidRepo:BidRepository, private readonly projectService:ProjectService, private readonly userService:UserService){}

    async find(bid:Partial<Bid>):Promise<Bid[]>{
        return this.bidRepo.find(bid);
    }

    async findOne( bid:Partial<Bid>):Promise<Bid>{
        return this.bidRepo.findOne(bid);
    }

    async create(userId:string, bid:Bid):Promise<Bid>{
        const project = await this.projectService.findOne({_id: bid.projectID})
        if(!project){
            throw new HttpException("Project does not exist", HttpStatus.NOT_FOUND)
        }else if(project.status != ProjectStatus.BIDDING_OPEN){
            throw new ForbiddenException("Project not open to bidding")
        }else if(await this.bidRepo.findOne({userID:new Types.ObjectId(userId), projectID:new Types.ObjectId(bid.projectID)})){
            throw new ForbiddenException("Already bidded for this project")
        }

        const newBid = await this.bidRepo.create(bid); 
        const totalBids = await this.totalBids(project._id.toString());
        const averageBid = await this.averageBids(project._id.toString());
        await this.projectService.updateOne(project._id.toString(), {totalBids, averageBid});
        
        return newBid; 
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
        
        const project = await this.projectService.findOne({userId: new Types.ObjectId(userId), _id: project_id});
        if(!project){
            throw new ForbiddenException("Invalid user, can't award this project");
        }
        const bid = await this.bidRepo.findOne({_id: bid_id, projectID:project._id});
        if(!bid){
            throw new HttpException("Cannot find bid", HttpStatus.NOT_FOUND);
        }

        await this.bidRepo.update(bidId, {isAwarded:true}).then(()=>{
            this.projectService.updateOne(project._id.toString(), {status: ProjectStatus.BIDDING_CLOSE})
        })
    }

    async unaward(userId:string, projectId:string, bidId:string):Promise<void>{
        const bid_id = new Types.ObjectId(bidId);
        const project_id = new Types.ObjectId(projectId);
        const project = await this.projectService.findOne({userId: new Types.ObjectId(userId), _id: project_id});
        if(!project){
            throw new ForbiddenException("Invalid user, can't unaward this project");
        }
        const bid = await this.bidRepo.findOne({_id: bid_id, projectID:project._id});
        if(!bid){
            throw new HttpException("Cannot find bid", HttpStatus.NOT_FOUND);
        }
        await this.bidRepo.update(bidId, {isAwarded:false}).then(()=>{
            this.projectService.updateOne(project._id.toString(), {status: ProjectStatus.BIDDING_OPEN})
        })
    }

    async totalBids(projectId:string):Promise<number>{
        return (await this.bidRepo.find({projectID: new Types.ObjectId(projectId)})).length;
    }

    async averageBids(projectId:string):Promise<number>{
        let totalBudget = 0;
        const bids = await this.bidRepo.find({projectID: new Types.ObjectId(projectId)});
        if(bids.length == 0){
            return 0;
        }
        for(let bid in bids){
            totalBudget += bids[bid].budget
        }
        return totalBudget / bids.length;
    }

    async finduser(userId:string):Promise<User>{
        return this.userService.findOne({_id: new Types.ObjectId(userId)});
    }

    //TODO: Team project bidding(more than 1 accepted bidder)
    //TODO: set project status to completed => payment occurs
    
}
