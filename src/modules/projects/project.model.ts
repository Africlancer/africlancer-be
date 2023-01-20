import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Project {
  @Field({ nullable: true })
  _id: string;

  @Field({ nullable: true })
  title: string;
  @Field({ nullable: true })
  budget: number;
  @Field({ nullable: true })
  summary: string;
  @Field({ nullable: true })
  details: string;
  @Field({ nullable: true })
  startDate: Date;
  @Field({ nullable: true })
  endDate: Date;
}

@InputType()
export class CommonProjectInput {
  
    @Field({ nullable: true })
    title: string;
    @Field({ nullable: true })
    budget: number;
    @Field({ nullable: true })
    summary: string;
    @Field({ nullable: true })
    details: string;
    @Field({ nullable: true })
    startDate: Date;
    @Field({ nullable: true })
    endDate: Date;
}

@InputType()
export class CreateProjectInput extends CommonProjectInput {
    @Field({ nullable: true })
    _id: string;
  
    @Field({ nullable: true })
    title: string;
    @Field({ nullable: true })
    budget: number;
    @Field({ nullable: true })
    summary: string;
    @Field({ nullable: true })
    details: string;
    @Field({ nullable: true })
    startDate: Date;
    @Field({ nullable: true })
    endDate: Date;
}

@InputType()
export class UpdateProjectInput extends CommonProjectInput {}

@InputType()
export class ProjectQueryInput extends CommonProjectInput {}
