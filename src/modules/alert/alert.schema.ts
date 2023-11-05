import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type AlertDocument = Alert & Document;

@Schema({ collection: "alert" })
export class Alert {
  _id: Types.ObjectId | string;
  @Prop()
  userId: Types.ObjectId;
  @Prop()
  refId: Types.ObjectId;
  @Prop()
  createdBy: Types.ObjectId;
  @Prop()
  createdAt: number;
  @Prop()
  updatedBy: Types.ObjectId;
  @Prop()
  updatedAt: number;
}

export const AlertSchema = SchemaFactory.createForClass(Alert);

export class PageParams {
  skip?: number;
  take?: number;
  userId?: string;
  refId?: string;
}

export class PageResult<T> {
  totalRecords: number;
  data: Array<T>;
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
