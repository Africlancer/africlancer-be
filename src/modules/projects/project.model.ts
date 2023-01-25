import { AutoMap } from '@automapper/classes';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

//Damilola: made some type changes and added support for mapping 

@ObjectType()
export class Project {
  @AutoMap()
  @Field()
  _id: string;

  @AutoMap()
  @Field()
  title: string;

  @AutoMap()
  @Field()
  budget: number;

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

  @Field({ nullable: true })
  projectId: string;
}

@InputType()
export class CommonProjectInput {
  @AutoMap()
  @Field({ nullable: true })
  title?: string;

  @AutoMap()
  @Field({ nullable: true })
  budget?: number;

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
}

@InputType()
export class CreateProjectInput {

  @AutoMap()
  @Field()
  title: string;

  @AutoMap()
  @Field()
  budget: number;

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
}

@InputType()
export class UpdateProjectInput extends CommonProjectInput {}

@InputType()
export class ProjectQueryInput extends CommonProjectInput {}

@InputType()
export class QueryProjectInput extends CommonProjectInput {}
