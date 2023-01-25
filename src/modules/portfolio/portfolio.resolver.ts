import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Param } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreatePortfolioInput,
  UpdatePortfolioInput,
  Portfolio,
  PortfolioQueryInput,
  QueryPortfolioInput,
} from './portfolio.model';
import { Portfolio as PortfolioSchema } from './portfolio.schema';

import { PortfolioService } from './portfolio.service';

@Resolver((of) => Portfolio)
export class PortfolioResolver {
  constructor(private readonly portfolioService: PortfolioService, @InjectMapper() private readonly classMapper: Mapper) {}

  @Mutation((returns) => Portfolio, { name: 'createPortfolio' })
  public async create(@Args('portfolio') portfolio: CreatePortfolioInput): Promise<Portfolio> {
    const queryMap = await this.classMapper.mapAsync(portfolio, CreatePortfolioInput, PortfolioSchema);
    return this.classMapper.mapAsync(await this.portfolioService.create(queryMap), PortfolioSchema, Portfolio);
    //BEFORE MAPPING: return (await this.PortfolioService.create(Portfolio as any)) as any;
  }

  @Mutation((returns) => Boolean, { name: 'updatePortfolio' })
  public async update(
    @Args('_id') _id: string,
    @Args('portfolio') portfolio: QueryPortfolioInput,
    //BEFORE MAPPING: @Args('portfolio') portfolio: UpdatePortfolioInput,
  ): Promise<boolean> {
    const queryMap = await this.classMapper.mapAsync(portfolio, QueryPortfolioInput, PortfolioSchema)
    await this.portfolioService.updateOne(_id, queryMap);
    //BEFORE MAPPING: await this.portfolioService.updateOne(_id, portfolio as any);
    return true;
  }

  @Query((returns) => Portfolio, { name: 'findOnePortfolio' })
  //BEFORE MAPPING: public async findOne(@Args('query') query: PortfolioQueryInput): Promise<Portfolio> {
  public async findOne(@Args('query') query: QueryPortfolioInput): Promise<Portfolio> {
    //const queryMap = await this.classMapper.mapAsync(query, QueryPortfolioInput, PortfolioSchema);
    return this.classMapper.mapAsync(await this.portfolioService.findOne(query as unknown), PortfolioSchema, Portfolio);
    //BEFORE MAPPING: return (await this.PortfolioService.findOne(query as any)) as any;
  }

  @Query((returns) => [Portfolio], { name: 'findPortfolios' })
  //BEFORE MAPPING: public async find(@Args('query') query: PortfolioQueryInput): Promise<Portfolio[]> {
  public async find(@Args('query') query: QueryPortfolioInput): Promise<Portfolio[]> {
    return this.classMapper.mapArrayAsync(await this.portfolioService.find(query), PortfolioSchema, Portfolio);
    //BEFORE MAPPING: return (await this.PortfolioService.find(query as any)) as any;
  }

  @Query((returns) => Boolean, { name: 'deletePortfolio' })
  public async delete(@Args('_id') _id: string): Promise<true> {
    await this.portfolioService.delete(_id);
    return true;
  }
}
