import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
  @AutoMap()
  _id: Types.ObjectId;

  @AutoMap()
  @Prop({ required: true })
  title: string;

  @AutoMap()
  @Prop({ required: true })
  budget: number;

  @AutoMap()
  @Prop({ required: true })
  summary: string;

  @AutoMap()
  @Prop({ required: true, minlength:3 })
  details: string;

  @AutoMap()
  @Prop({ required: true })
  startDate: Date;

  @AutoMap()
  @Prop({ required: true })
  endDate: Date;

  @Prop({})
  projectId: number;
}


export const ProjectSchema = SchemaFactory.createForClass(Project);

/// how the schema is supposed to be
//  @Prop({ required: true, minlength:300, maxlength:2000 })
// details: string;
// @Prop({ type:'date' })
// startDate: string;
// @Prop({ type:'date' })
// endDate: string;

//Damilola: made some type changes and added support for mapping 