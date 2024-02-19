import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from "@nestjs/common";
import { WalletTransactionRepository } from "./transaction.repository";
import {
  PageParams,
  PageResult,
  WalletTransaction,
} from "./transaction.schema";
import { WalletService } from "../wallet.service";
import { UserService } from "src/modules/user/user.service";
import { WalletTransactionStatusType } from "./transaction.enum";

@Injectable()
export class WalletTransactionService {
  constructor(
    private readonly walletTransactionRepo: WalletTransactionRepository,
    private readonly walletSvc: WalletService,
    private readonly userSvc: UserService,
  ) {}

  public async create(model: WalletTransaction): Promise<WalletTransaction> {
    console.log(model)
    return this.walletTransactionRepo.create(model);
  }

  public async update(
    id: string,
    model: Partial<WalletTransaction>
  ): Promise<WalletTransaction> {
    const transaction = await this.walletTransactionRepo.findById(id);
    if (!transaction) throw new Error("Transaction not found");

    return this.walletTransactionRepo.update(id, model);
  }

  public async delete(model: Partial<WalletTransaction>): Promise<Boolean> {
    await this.walletTransactionRepo.delete(model);
    return true;
  }

  //   public async delete(id: string): Promise<Boolean> {
  //     await this.walletTransactionRepo.delete(id);
  //     return true;
  //   }

  public async findById(id: string): Promise<WalletTransaction> {
    return this.findOne({ _id: id } as any);
  }

  public async find(
    query: Partial<WalletTransaction>
  ): Promise<WalletTransaction[]> {
    return this.walletTransactionRepo.find(query);
  }

  public async findOne(
    query: Partial<WalletTransaction>
  ): Promise<WalletTransaction> {
    return this.walletTransactionRepo.findOne(query);
  }

  public async walletTopup(model: Partial<WalletTransaction>): Promise<WalletTransaction>{
    let transaction: WalletTransaction;
    const wallet = await this.walletSvc.findById(model.walletId.toString());
    if(!wallet)
     throw new HttpException("Wallet not found", HttpStatus.NOT_FOUND);

    //Initiate transation
    transaction = await this.walletTransactionRepo.create({
      ...model,
      transactionId: `ms-sjuhc7dtf8eugdf8tehj3ueg2${new Date().getMilliseconds()}`, //TODO: generate transaction ref
    } as any);

    //Complete payment
    //TODO: payment api implemented here

    //Update wallet
    await this.walletSvc.update(wallet._id.toString(), {
      balance: this.walletSvc.formatBalance(wallet.balance + transaction.amount),
      total_amount_topup: this.walletSvc.formatBalance(wallet.total_amount_topup + transaction.amount)
    });

    //Complete transation
    transaction = await this.walletTransactionRepo.update(transaction._id.toString(), {
      status: WalletTransactionStatusType.PAID,
      balanceBefore: this.walletSvc.formatBalance(wallet.balance),
      balanceAfter: this.walletSvc.formatBalance(wallet.balance + transaction.amount)
    });

    return transaction;
  }

  public async walletWithdraw(model: Partial<WalletTransaction>): Promise<WalletTransaction>{
    let transaction: WalletTransaction;
    const wallet = await this.walletSvc.findById(model.walletId.toString());
    if(!wallet)
     throw new HttpException("Wallet not found", HttpStatus.NOT_FOUND);

    if (wallet.balance < model.amount)
     throw new HttpException("Wallet balance too low for this transaction", HttpStatus.FORBIDDEN);

    //Initiate transation
    transaction = await this.walletTransactionRepo.create({
      ...model,
      transactionId: `ms-sjuhc7dtf8eugdf8tehj3ueg2${new Date().getMilliseconds()}`, //TODO: generate transaction ref
    } as any);

    //Complete payment
    //TODO: payment api implemented here

    //Update wallet
    await this.walletSvc.update(wallet._id.toString(), {
      balance: this.walletSvc.formatBalance(wallet.balance - transaction.amount),
    });

    //Complete transation
    transaction = await this.walletTransactionRepo.update(transaction._id.toString(), {
      status: WalletTransactionStatusType.WITHDRAW,
      balanceBefore: this.walletSvc.formatBalance(wallet.balance),
      balanceAfter: this.walletSvc.formatBalance(wallet.balance - transaction.amount)
    });

    return transaction;
  }

  seed = async (): Promise<void> => {
    await this.walletTransactionRepo.seed();
  };

  async page(project: Partial<WalletTransaction>, page: PageParams): Promise<PageResult<WalletTransaction>>{
    return this.walletTransactionRepo.page(project, page);
}

  public async count(query: Partial<WalletTransaction>) {
    return this.walletTransactionRepo.count(query);
  }
}
