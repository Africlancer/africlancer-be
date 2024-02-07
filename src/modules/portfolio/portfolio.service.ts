import { Injectable } from '@nestjs/common';
import { PortfolioRepository } from './portfolio.repository';
import { PageParams, PageResult, Portfolio } from './portfolio.schema';

@Injectable()
export class PortfolioService {
  constructor(private readonly PortfolioRepo: PortfolioRepository) {}

  public create(portfolio: Portfolio): Promise<Portfolio> {
    return this.PortfolioRepo.create(portfolio);
  }

  public async updateOne(_id: string, portfolio: Partial<Portfolio>): Promise<void> {
    this.PortfolioRepo.updateOne(_id, portfolio);
  }

  public async findOne(portfolio: Partial<Portfolio>): Promise<Portfolio> {
    return this.PortfolioRepo.findOne(portfolio);
  }

  public async find(portfolio: Partial<Portfolio>): Promise<Portfolio[]> {
    return this.PortfolioRepo.find(portfolio);
  }

  public async delete(_id: string): Promise<void> {
    await this.PortfolioRepo.delete(_id);
  }

  async page(project: Partial<Portfolio>, page: PageParams): Promise<PageResult<Portfolio>>{
    return this.PortfolioRepo.page(project, page);
  }
}