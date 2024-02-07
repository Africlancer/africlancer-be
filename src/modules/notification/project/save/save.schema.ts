import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SaveProjectNotificationDocument = HydratedDocument<SaveProjectNotification>;

@Schema({collection:"project_notification_saves"})
export class SaveProjectNotification {
  _id: Types.ObjectId;

  @Prop({ required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  notificationId: Types.ObjectId;
}


export const SaveProjectNotificationSchema = SchemaFactory.createForClass(SaveProjectNotification);

export class PageResult<T> {
  totalRecords: number;
  data: Array<T>;
}

export class PageParams {
  skip?: number;
  limit?: number;
  keyword?: string;
}

export const handlePageFacet = (page: PageParams) => {
  return {
      $facet: {
          data: [{ $skip: Number(page.skip) }, { $limit: Number(page.limit) }],
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