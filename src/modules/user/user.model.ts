import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field({ nullable: true })
  _id: string;
  @Field({ nullable: true })
  firstName: string;
  @Field({ nullable: true })
  otherName: string;
  @Field({ nullable: true })
  lastName: string;
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  username: string;
  @Field((type) => [String], { nullable: true })
  books: String[];
}

@InputType()
export class CommonUserInput {
  @Field({ nullable: true })
  firstName: string;
  @Field({ nullable: true })
  otherName: string;
  @Field({ nullable: true })
  lastName: string;
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  username: string;
}

@InputType()
export class CreateUserInput extends CommonUserInput {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  email: string;
  @Field()
  username: string;
}

@InputType()
export class UpdateUserInput extends CommonUserInput {}

@InputType()
export class UserQueryInput extends CommonUserInput {}
