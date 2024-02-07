import { AutoMap } from '@automapper/classes';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

//Damilola: made some type changes and added support for mapping 

@ObjectType()
export class Portfolio {
  @AutoMap()
  @Field()
  _id: string;

  @AutoMap()
  @Field({})
  title: string;

  @AutoMap()
  @Field({})
  summary: string;

  @AutoMap()
  @Field({})
  url: string;

  @AutoMap()
  @Field({})
  stack: string;
}

@InputType()
export class CommonPortfolioInput {

  @AutoMap()
  @Field({ nullable:true })
  title?: string;

  @AutoMap()
  @Field({ nullable:true })
  summary?: string;

  @AutoMap()
  @Field({ nullable:true })
  url?: string;

  @AutoMap()
  @Field({ nullable:true })
  stack?: string;
}

@InputType()
export class CreatePortfolioInput {

  @AutoMap()
  @Field({})
  title: string;

  @AutoMap()
  @Field({})
  summary: string;

  @AutoMap()
  @Field({})
  url: string;

  @AutoMap()
  @Field({})
  stack: string;
}

@InputType()
export class UpdatePortfolioInput extends CommonPortfolioInput {}

@InputType()
export class PortfolioQueryInput extends CommonPortfolioInput {}

@InputType()
export class QueryPortfolioInput extends CommonPortfolioInput {}


@InputType()
export class PortfolioPageInput {
  @Field((type) => Number, { nullable: false })
  skip: number;
  @Field((type) => Number, { nullable: false })
  limit: number;
  @Field((type) => String, { nullable: true })
  keyword: string;
}

@ObjectType()
export class PortfolioPageResult {
  @Field((type) => Number, { nullable: false })
  totalRecords: number;
  @Field((type) => [Portfolio])
  data: [Portfolio];
}



