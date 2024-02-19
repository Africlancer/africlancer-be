import {
  Field,
  ID,
  InputType,
  ObjectType,
  PartialType,
  registerEnumType,
} from "@nestjs/graphql";
import { WalletTransactionStatusType } from "./transaction.enum";

registerEnumType(WalletTransactionStatusType, {
  name: "WalletTransactionStatusType",
});

@ObjectType()
export class WalletTransaction {
  @Field((type) => ID)
  _id?: string;

  @Field((type) => String)
  userId: string;

  @Field((type) => String)
  walletId: string;

  @Field((type) => String, { nullable: true })
  transactionId?: string;

  @Field((type) => Number, { nullable: true })
  amount?: number;

  @Field((type) => Number, { nullable: true })
  balanceBefore?: number;

  @Field((type) => Number, { nullable: true })
  balanceAfter?: number;

  @Field((type) => WalletTransactionStatusType, { nullable: true })
  status?: WalletTransactionStatusType;

  @Field((type) => Number, { nullable: true })
  createdAt?: number;

  @Field((type) => Number, { nullable: true })
  updatedAt?: number;
}

@InputType()
export class CreateWalletTransactionInput {
  @Field((type) => String)
  userId: string;

  @Field((type) => String)
  walletId: string;

  @Field((type) => String, { nullable: true })
  transactionId?: string;

  @Field((type) => Number)
  amount: number;
}

@InputType()
export class CommonWalletTransactionInput {
  @Field((type) => String, { nullable: true })
  userId?: string;

  @Field((type) => String, { nullable: true })
  walletId?: string;

  @Field((type) => String, { nullable: true })
  transactionId?: string;

  @Field((type) => Number, { nullable: true })
  balance?: number;

  @Field((type) => Number, { nullable: true })
  amount?: number;

  @Field((type) => Number, { nullable: true })
  balanceBefore?: number;

  @Field((type) => Number, { nullable: true })
  balanceAfter?: number;

  @Field((type) => WalletTransactionStatusType, { nullable: true })
  status?: WalletTransactionStatusType;
}

@InputType()
export class UpdateWalletTransactionInput extends CommonWalletTransactionInput {}

@InputType()
export class WalletTransactionInput {
  @Field((type) => Number)
  amount: number;

  @Field((type) => String)
  walletId: string;
}

@InputType()
export class QueryWalletTransactionInput extends CommonWalletTransactionInput {}

@InputType()
export class WalletTransactionPageInput {
  @Field((type) => Number, { nullable: false })
  skip: number;
  @Field((type) => Number, { nullable: false })
  take: number;
  @Field((type) => String, { nullable: true })
  userId: string;
  @Field({ nullable: true })
  walletId: string;
  @Field((type) => String, { nullable: true })
  keyword: string;
}

@ObjectType()
export class WalletTransactionPageResult {
  @Field((type) => Number, { nullable: false })
  totalRecords: number;
  @Field((type) => [WalletTransaction])
  data: [WalletTransaction];
}

@ObjectType()
export class WalletTransactionSummary {
  @Field()
  totalCount: number;
  @Field()
  totalPending: number;
}
