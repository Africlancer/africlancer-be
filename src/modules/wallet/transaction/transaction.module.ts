import { MongooseModule } from "@nestjs/mongoose";
import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "src/modules/auth/auth.module";
import {
  WalletTransaction,
  WalletTransactionSchema,
} from "./transaction.schema";
import { WalletTransactionService } from "./transaction.service";
import { WalletTransactionRepository } from "./transaction.repository";
import {
  WalletTransactionResolver,
} from "./transaction.resolver";
import { UserModule } from "src/modules/user/user.module";
import { WalletModule } from "../wallet.module";
import { WalletTransactionController } from "./transaction.controller";
import { ProfileModule } from "src/modules/profile/profile.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WalletTransaction.name, schema: WalletTransactionSchema },
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => ProfileModule),
    forwardRef(() => WalletModule),

  ],
  controllers: [WalletTransactionController],
  providers: [
    WalletTransactionService,
    WalletTransactionRepository,
    WalletTransactionResolver,
  ],
  exports: [WalletTransactionService, WalletTransactionRepository],
})
export class WalletTransactionModule {}
