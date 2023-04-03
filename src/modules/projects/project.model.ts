import { AutoMap } from '@automapper/classes';
import { Field, InputType, Mutation, ObjectType, registerEnumType } from '@nestjs/graphql';
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

  @AutoMap()
  @Field({ nullable: true })
  totalBids: number;

  @AutoMap()
  @Field({ nullable: true })
  averageBid: number;

  @AutoMap()
  @Field(type => [String])
  skills: String[];
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

  @AutoMap()
  @Field(type => [String])
  skills: String[];
}

@InputType()
export class QueryProjectInput extends CommonProjectInput {
  @AutoMap()
  @Field({nullable:true})
  _id?: string;
}

@ObjectType()
export class Subscription{
  @AutoMap()
  @Field(type => [String])
  newProject: Project[];
}