import {
    Field,
    InputType,
    ObjectType,
    registerEnumType,
  } from "@nestjs/graphql";




  @ObjectType()
  export class Alert {
    @Field({})
    _id: string;
    @Field({ nullable: true })
    userId: string;
    @Field({ nullable: true })
    refId: string;
  
    @Field({})
    createdAt: string;
    @Field((type) => Number, { nullable: true })
    updatedAt: string;
  }
  
  @ObjectType()
  export class AlertPageResult {
    @Field({})
    totalRecords: number;
    @Field((type) => [Alert])
    data: Array<Alert>;
  }
  
  @InputType()
  export class AlertPageInput {
    @Field({})
    skip: number;
    @Field({})
    take: number;
    @Field({ nullable: true })
    userId: string;
  }
  
  @InputType()
  export class CreateAlertInput {
    @Field({})
    userId: string;
    @Field({})
    refId: string;
  }
  
  
  @InputType()
  export class AlertQueryInput {
    @Field({ nullable: true })
    userId?: string;
    @Field({ nullable: true })
    refId?: string;
  }
  
  @ObjectType()
  export class AlertSummary {
    @Field()
    totalCount: number;
  }