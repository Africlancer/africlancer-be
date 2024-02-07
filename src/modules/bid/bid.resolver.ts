import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GqlCurrentUser } from '../auth/decorators/gql.user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlJwtGuard } from '../auth/guards/gql.jwt.guard';
import { Role } from '../auth/roles.enum';
import { Bid, BidPageInput, BidPageResult, CreateBidInput, QueryBidInput } from './bid.model';
import { BidService } from './bid.service';
import { User } from '../user/user.model';
import { Profile } from '../profile/profile.model';

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
    async update(@Args("id") id:string, @Args("bid") bid:QueryBidInput):Promise<Boolean>{
        await this.bidSvc.update(id, bid as any) as any;
        return true;
    }

    @Mutation(returns => Boolean, {name:"deleteBid"})
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    async delete(@Args("id") id:string):Promise<Boolean>{
        await this.bidSvc.delete(id);
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

    @Query(returns => Number, {name:"totalBids"})
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    async totalBids(@Args("projectId") projectId:string):Promise<Number>{
        return this.bidSvc.totalBids(projectId);
    }

    @Query(returns => Number, {name:"averageBids"})
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    async averageBids(@Args("projectId") projectId:string):Promise<Number>{
        return this.bidSvc.averageBids(projectId);
    }

    @ResolveField(returns => User)
    async user(@Parent() bid:Bid):Promise<any>{
        return this.bidSvc.finduser(bid.userID);
    }

    @ResolveField(returns => Profile)
    async profile(@Parent() bid:Bid):Promise<any>{
        return this.bidSvc.findProfile(bid.userID);
    }

    @Query((returns) => BidPageResult, { name: 'bidPage' })
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    public async page(@Args('query') query: QueryBidInput, @Args("page") page: BidPageInput) {
      return this.bidSvc.page(query as any, page);
    }
}
