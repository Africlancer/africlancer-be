import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
  _id: Types.ObjectId;

  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  budget: number;
  @Prop({ required: true })
  summary: string;
  @Prop({ required: true, minlength:3 })
  details: string;
  @Prop({})
  startDate: string;
  @Prop({})
  endDate: string;
}


export const ProjectSchema = SchemaFactory.createForClass(Project);

/// how the schema is supposed to be
//  @Prop({ required: true, minlength:300, maxlength:2000 })
// details: string;
// @Prop({ type:'date' })
// startDate: string;
// @Prop({ type:'date' })
// endDate: string;