import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { NotificationType } from './notification.enum';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema()
export class Notification {
  _id: Types.ObjectId;

  @Prop({ required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  refId: Types.ObjectId;

  @Prop({ required: true })
  message: string;

  @Prop({required: true, enum: NotificationType})
  type: NotificationType;

  @Prop({})
  createdAt?: number;
}


export const NotificationSchema = SchemaFactory.createForClass(Notification);