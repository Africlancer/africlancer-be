import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Portfolio, PortfolioDocument } from './portfolio.schema';

@Injectable()
export class PortfolioRepository {
  constructor(@InjectModel(Portfolio.name) private portfolioModel: Model<PortfolioDocument>) {}

  public create(portfolio: Portfolio): Promise<Portfolio> {
    const createPortfolio = new this.portfolioModel(portfolio);
    return createPortfolio.save();
  }

  public async updateOne(_id: string, portfolio: Partial<Portfolio>): Promise<void> {
    delete portfolio._id;
    await this.portfolioModel.updateOne({ _id: new Types.ObjectId(_id)},portfolio);
  }

  public async findOne(portfolio: Partial<Portfolio>): Promise<Portfolio> {
    if (portfolio._id) portfolio._id = new Types.ObjectId(portfolio._id);
    return await this.portfolioModel.findOne(portfolio);
  }

  public async find(portfolio: Partial<Portfolio>): Promise<Portfolio[]> {

    return await this.portfolioModel.find(portfolio);
  }

  public async delete(_id: string): Promise<void> {
    await this.portfolioModel.deleteOne({ _id: new Types.ObjectId(_id) });
  }

}
