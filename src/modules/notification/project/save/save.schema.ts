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