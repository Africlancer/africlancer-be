import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProjectNotificationDocument = HydratedDocument<ProjectNotification>;

@Schema({collection:"project_notifications"})
export class ProjectNotification {
  _id: Types.ObjectId;

  @Prop({ required: true })
  projectId: Types.ObjectId;

  @Prop({})
  createdAt?: number;
}


export const ProjectNotificationSchema = SchemaFactory.createForClass(ProjectNotification);