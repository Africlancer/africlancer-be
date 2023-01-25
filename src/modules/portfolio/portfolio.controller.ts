import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { get } from 'http';
import { Portfolio } from './portfolio.schema';
import { PortfolioService } from './portfolio.service';

@Controller('/portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  public create(@Body() Portfolio: Portfolio): Promise<Portfolio> {
    return this.portfolioService.create(Portfolio);
  }

  @Put()
  public async updateOne(_id: string, Portfolio: Portfolio): Promise<void> {
    this.portfolioService.updateOne(_id, Portfolio);
  }

  @Get('retrieve/:id')
  public async findOne(@Param() id: string): Promise<Portfolio> {
    return this.portfolioService.findOne({ _id: id } as any);
  }

  @Get('/all')
  public async find(): Promise<Portfolio[]> {
    return this.portfolioService.find({} as any);
  }

  @Delete(':id')
  public async delete(@Param() id: string): Promise<void> {
    await this.portfolioService.delete(id);
  }
}
