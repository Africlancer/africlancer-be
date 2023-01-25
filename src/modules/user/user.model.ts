import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';

//TODO: Add Validation
@ObjectType()
export class User {
  @Field()
  _id: string;
  @Field({ nullable: true })
  firstName: string;
  @Field({ nullable: true })
  otherName: string;
  @Field({ nullable: true })
  lastName: string;
  @Field()
  email: string;
  @Field({ nullable: true })
  username: string;
}


// @InputType()
// export class CommonUserInput {
//   @Field({ nullable: true })
//   firstName: string;
//   @Field({ nullable: true })
//   otherName: string;
//   @Field({ nullable: true })
//   lastName: string;
//   @Field({ nullable: true })
//   email: string;
//   @Field({ nullable: true })
//   username: string;
//   @Field({ nullable: true })
//   password:string;
// }

//TODO: Add Validation
@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  firstName: string;
  @Field({ nullable: true })
  lastName: string;
  @Field({ nullable: true })
  otherName: string;
  @Field()
  email: string;
  @Field({ nullable: true })
  username: string;
  @Field()
  password:string;
}

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {}

@InputType()
export class UserQueryInput extends PartialType(CreateUserInput) {}
