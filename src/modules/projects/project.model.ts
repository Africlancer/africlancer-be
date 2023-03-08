import { AutoMap } from '@automapper/classes';
import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ProjectStatus, ProjectType } from './project.enum';

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
  @Field()
  startDate: Date;

  @AutoMap()
  @Field()
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
  @Field()
  startDate: Date;

  @AutoMap()
  @Field()
  endDate: Date;

  @AutoMap()
  @Field(type => ProjectType)
  type: ProjectType;
}

@InputType()
export class QueryProjectInput extends CommonProjectInput {}
