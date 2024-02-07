import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ProjectStatus, ProjectType } from './project.enum';
import { FileUploadObject } from '../upload/upload.schema';

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
  @Prop({ required: false })
  startDate: Date;

  @AutoMap()
  @Prop({ required: false })
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
  @Prop({default:0})
  totalBids: number;

  @AutoMap()
  @Prop({default:0})
  averageBid: number;

  @AutoMap()
  @Prop()
  skills: Array<String>;

  @Prop()
  files?: Array<FileUploadObject>;
}


export const ProjectSchema = SchemaFactory.createForClass(Project);

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
/// how the schema is supposed to be
//  @Prop({ required: true, minlength:300, maxlength:2000 })
// details: string;
// @Prop({ type:'date' })
// startDate: string;
// @Prop({ type:'date' })
// endDate: string;