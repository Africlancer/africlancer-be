import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ProjectStatus, ProjectType } from './project.enum';

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
  @AutoMap()
  _id: Types.ObjectId;

  @AutoMap()
  @Prop({ required: true })
  userId: Types.ObjectId;

  @AutoMap()
  @Prop({ required: true })
  title: string;

  @AutoMap()
  @Prop({ required: true })
  minBudget: number;

  @AutoMap()
  @Prop({ required: true })
  maxBudget: number;

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

  @AutoMap()
  @Prop({})
  projectId: number;

  @AutoMap()
  @Prop({type:String, enum:ProjectStatus, required: true, default: ProjectStatus.BIDDING_OPEN})
  status: ProjectStatus;

  @AutoMap()
  @Prop({type:String, enum:ProjectType, required: true})
  type:ProjectType;

  @AutoMap()
  @Prop({})
  totalBids: number;

  @AutoMap()
  @Prop({})
  averageBid: number;

  @AutoMap()
  @Prop()
  skills: Array<String>;
}


export const ProjectSchema = SchemaFactory.createForClass(Project);

/// how the schema is supposed to be
//  @Prop({ required: true, minlength:300, maxlength:2000 })
// details: string;
// @Prop({ type:'date' })
// startDate: string;
// @Prop({ type:'date' })
// endDate: string;