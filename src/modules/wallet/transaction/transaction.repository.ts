import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import {
  PageParams,
  PageResult,
  WalletTransaction,
  WalletTransactionDocument,
  handlePageFacet,
  handlePageResult,
} from "./transaction.schema";

@Injectable()
export class WalletTransactionRepository {
  constructor(
    @InjectModel(WalletTransaction.name)
    private walletTransactionModel: Model<WalletTransactionDocument>
  ) {}

  public async create(model: WalletTransaction): Promise<WalletTransaction> {
    if (model.userId) model.userId = new Types.ObjectId(model.userId);

    const createdWallet = new this.walletTransactionModel({
      ...model,
      createdAt: Date.now(),
    });
    return await createdWallet.save();
  }

  public async update(
    id: string,
    model: Partial<WalletTransaction>
  ): Promise<WalletTransaction> {
    await this.walletTransactionModel.updateOne(
      { _id: id },
      {
        ...model,
        updatedAt: Date.now(),
      }
    );
    return this.findById(id);
  }

  public async delete(model: Partial<WalletTransaction>): Promise<void> {
    if (model._id) model._id = new Types.ObjectId(model._id);
    if (model.userId) model.userId = new Types.ObjectId(model.userId);
    await this.walletTransactionModel.deleteMany(model);
  }

  //   public async delete (id: string): Promise<void>  {
  //     await this.walletTransactionModel.deleteOne({ _id: new Types.ObjectId(id) });
  //   }

  public async find(
    query: Partial<WalletTransaction>
  ): Promise<Array<WalletTransaction>> {
    return await this.walletTransactionModel.find(query);
  }

  public async findOne(
    query: Partial<WalletTransaction>
  ): Promise<WalletTransaction> {
    if (query._id) query._id = new Types.ObjectId(query._id);
    if (query.userId) query.userId = new Types.ObjectId(query.userId);

    return await this.walletTransactionModel.findOne(query);
  }

  public async findById(id: string): Promise<WalletTransaction> {
    return await this.walletTransactionModel.findById(id);
  }

  seed = async () => {};

  public async page(query: Partial<WalletTransaction>, page: PageParams): Promise<PageResult<WalletTransaction>> {
    return this.walletTransactionModel.aggregate([
      {$match: query},
      { $sort: { createdAt: -1 } },
      { ...handlePageFacet(page) },
    ])
    .then(handlePageResult)
    .then((rs) => {
      return rs;
    });
  }
  
  public async count(query: Partial<WalletTransaction>) {
    return this.walletTransactionModel.countDocuments(query);
  }
}
