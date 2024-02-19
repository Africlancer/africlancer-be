import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { WalletRepository } from "./wallet.repository";
import { Wallet } from "./wallet.schema";
import { Types } from "mongoose";
import { UserService } from "../user/user.service";
import { User } from "../user/user.schema";
import { Profile } from "../profile/profile.schema";
import { ProfileService } from "../profile/profile.service";

@Injectable()
export class WalletService {
  constructor(
    private readonly WalletRepo: WalletRepository,
    private readonly userSvc: UserService,
    private readonly profileSvc: ProfileService,
    ) {}

  public async create(model: Wallet): Promise<Wallet> {
    return this.WalletRepo.create(model);
  }

  public async update(id: string, model: Partial<Wallet>): Promise<Wallet> {
    const wallet = await this.WalletRepo.findById(id);
    if (!wallet) throw new Error("Wallet not found");

    return this.WalletRepo.update(id, model);
  }

  public async delete(model: Partial<Wallet>): Promise<Boolean> {
    await this.WalletRepo.delete(model);
    return true;
  }

  //   public async delete(id: string): Promise<Boolean> {
  //     await this.WalletRepo.delete(id);
  //     return true;
  //   }

  public async findById(id: string): Promise<Wallet> {
    return await this.findOne({ _id: id } as any);
  }

  public async find(query: Partial<Wallet>): Promise<Wallet[]> {
    return await this.WalletRepo.find(query);
  }

  public async findOne(query: Partial<Wallet>): Promise<Wallet> {
    return await this.WalletRepo.findOne(query);
  }

  public formatBalance(amount: number): number{
    return Number((amount).toFixed(5)).valueOf();
  }

  async finduser(userId:string):Promise<User>{
    return this.userSvc.findOne({_id: new Types.ObjectId(userId)});
  }

  async findProfile(userId:string):Promise<Profile>{
      return this.profileSvc.findOne({userID: new Types.ObjectId(userId)});
  }

}
