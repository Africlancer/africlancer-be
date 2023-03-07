import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlCurrentUser } from '../auth/decorators/gql.user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlJwtGuard } from '../auth/guards/gql.jwt.guard';
import { Role } from '../auth/roles.enum';
import { Bid, CreateBidInput, QueryBidInput } from './bid.model';
import { BidService } from './bid.service';

@Resolver(of=>Bid)
export class BidResolver {
    constructor(private readonly bidSvc:BidService){}

    @Query(returns => [Bid], {name:"findBids"})
    async find(@Args("query") query:QueryBidInput):Promise<Bid[]>{
        return this.bidSvc.find(query as any) as any;
    }

    @Query(returns => Bid, {name:"findOneBid"})
    async findOne(@Args("query") query:QueryBidInput):Promise<Bid>{
        return this.bidSvc.findOne(query as any) as any;
    }

    @Mutation(returns => Bid, {name:"createBid"})
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    async create(@GqlCurrentUser() user:any, @Args("bid") bid:CreateBidInput):Promise<Bid>{
        bid.userID = user.sub;
        return this.bidSvc.create(user.sub, bid as any) as any;
    }

    @Mutation(returns => Boolean, {name:"updateBid"})
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    async update(@GqlCurrentUser() user:any,@Args("bid") bid:QueryBidInput):Promise<Boolean>{
        return this.bidSvc.update(user.sub, bid as any) as any;
    }

    @Mutation(returns => Boolean, {name:"deleteBid"})
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    async delete(@GqlCurrentUser() user:any):Promise<Boolean>{
        await this.bidSvc.delete(user.sub);
        return true;
    }

    @Mutation(returns => Boolean, {name:"awardBid"})
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    async award(@GqlCurrentUser() user:any, @Args("projectId") projectId:string, @Args("bidId") bidId:string):Promise<Boolean>{
        await this.bidSvc.award(user.sub, projectId, bidId);
        return true;
    }

    @Mutation(returns => Boolean, {name:"unawardBid"})
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    async unaward(@GqlCurrentUser() user:any, @Args("projectId") projectId:string, @Args("bidId") bidId:string):Promise<Boolean>{
        await this.bidSvc.unaward(user.sub, projectId, bidId);
        return true;
    }


}
