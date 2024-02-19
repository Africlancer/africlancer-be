import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { WalletTransactionStatusType } from "./transaction.enum";

export type WalletTransactionDocument = WalletTransaction & Document;

@Schema({ collection: "wallet_transaction" })
export class WalletTransaction {
  _id?: Types.ObjectId;

  @Prop({ required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  walletId: Types.ObjectId;

  @Prop()
  transactionId?: string;

  @Prop({ required: true })
  amount: number;

  @Prop({})
  balanceBefore?: number;

  @Prop({})
  balanceAfter?: number;

  @Prop({
    enum: WalletTransactionStatusType,
    required: true,
    default: WalletTransactionStatusType.PENDING,
  })
  status: WalletTransactionStatusType;

  @Prop()
  createdAt?: number;

  @Prop()
  updatedAt?: number;
}

export const WalletTransactionSchema = SchemaFactory.createForClass(
  WalletTransaction
);


export class PageResult<T> {
  totalRecords: number;
  data: Array<T>;
}

export class PageParams {
  skip?: number;
  take?: number;
  keyword?: string;
  walletId?: string;
  userId?: string;
}

export const handlePageFacet = (page: PageParams) => {
  return {
    $facet: {
      data: [{ $skip: Number(page.skip) }, { $limit: Number(page.take) }],
      totalRecords: [{ $count: "count" }],
    },
  };
};

export const handlePageResult = (res: any) => {
  let rs = res[0] as any;
  if (rs.totalRecords.length)
    rs = { ...rs, totalRecords: rs.totalRecords[0].count };
  else rs = { ...rs, totalRecords: 0 };

  return rs;
};
