import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioController } from './portfolio.controller';
import { PortfolioResolver } from './portfolio.resolver';
import { PortfolioRepository } from './portfolio.repository';
import { Portfolio, PortfolioSchema } from './portfolio.schema';
import { PortfolioService } from './portfolio.service';
import { PortfolioMapper } from './portfolio.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Portfolio.name, schema: PortfolioSchema }]),
  ],
  controllers: [PortfolioController],
  providers: [PortfolioResolver, PortfolioService, PortfolioRepository, PortfolioMapper],
})
export class portfolioModule {}
