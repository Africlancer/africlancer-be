import { AutoMap } from '@automapper/classes';
import { Field, InputType, Mutation, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ProjectStatus, ProjectType } from './project.enum';
import { FileUploadObject } from '../upload/upload.model';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';

registerEnumType(ProjectStatus, {
  name:"ProjectStatus"
})

registerEnumType(ProjectType, {
  name:"ProjectType"
})

@ObjectType()
export class Project {
  @AutoMap()
  @Field()
  _id: string;

  @AutoMap()
  @Field({ nullable: true })
  userId?: string;

  @AutoMap()
  @Field()
  title: string;

  @AutoMap()
  @Field()
  minBudget: number;

  @AutoMap()
  @Field()
  maxBudget: number;

  @AutoMap()
  @Field()
  summary: string;

  @AutoMap()
  @Field()
  details: string;

  @AutoMap()
  @Field({ nullable: true })
  startDate: Date;

  @AutoMap()
  @Field({ nullable: true })
  endDate: Date;

  @AutoMap()
  @Field({ nullable: true })
  projectId: string;

  @AutoMap()
  @Field(type => ProjectStatus, { nullable: true })
  status: ProjectStatus;

  @AutoMap()
  @Field(type => ProjectType)
  type: ProjectType;

  @AutoMap()
  @Field({ nullable: true })
  totalBids: number;

  @AutoMap()
  @Field({ nullable: true })
  averageBid: number;

  @AutoMap()
  @Field(type => [String])
  skills: String[];

  @Field(type => [FileUploadObject])
  files: FileUploadObject[];

}

@InputType()
export class CommonProjectInput {
  @AutoMap()
  @Field({ nullable: true })
  userId?: string;

  @AutoMap()
  @Field({ nullable: true })
  title?: string;

  @AutoMap()
  @Field({ nullable: true })
  minBudget?: number;

  @AutoMap()
  @Field({ nullable: true })
  maxBudget?: number;

  @AutoMap()
  @Field({ nullable: true })
  summary?: string;

  @AutoMap()
  @Field({ nullable: true })
  details?: string;

  @AutoMap()
  @Field({ nullable: true })
  startDate?: Date;

  @AutoMap()
  @Field({ nullable: true })
  endDate?: Date;

  @AutoMap()
  @Field(type => ProjectType, { nullable: true })
  type?: ProjectType;

  @AutoMap()
  @Field({ nullable: true })
  totalBids?: number;

  @AutoMap()
  @Field({ nullable: true })
  averageBid?: number;

  @AutoMap()
  @Field(type => [String], { nullable: true })
  skills?: String[];

  @Field(type => [GraphQLUpload], { nullable: true })
  files?: FileUpload[];
}

@InputType()
export class CreateProjectInput {
  
  @AutoMap()
  @Field({ nullable: true })
  userId?: string;

  @AutoMap()
  @Field()
  title: string;

  @AutoMap()
  @Field()
  minBudget: number;

  @AutoMap()
  @Field()
  maxBudget: number;

  @AutoMap()
  @Field()
  summary: string;

  @AutoMap()
  @Field()
  details: string;

  @AutoMap()
  @Field({ nullable:true })
  startDate: Date;

  @AutoMap()
  @Field({ nullable:true })
  endDate: Date;

  @AutoMap()
  @Field(type => ProjectType)
  type: ProjectType;

  @AutoMap()
  @Field(type => [String])
  skills: String[];

  @Field(type => [GraphQLUpload], { nullable: true })
  files?: FileUpload[];
}

@InputType()
export class QueryProjectInput extends CommonProjectInput {
  @AutoMap()
  @Field({nullable:true})
  _id?: string;
}

@InputType()
export class ProjectPageInput {
  @Field((type) => Number, { nullable: false })
  skip: number;
  @Field((type) => Number, { nullable: false })
  limit: number;
  @Field((type) => String, { nullable: true })
  keyword: string;
}

@ObjectType()
export class ProjectPageResult {
  @Field((type) => Number, { nullable: false })
  totalRecords: number;
  @Field((type) => [Project])
  data: [Project];
}
