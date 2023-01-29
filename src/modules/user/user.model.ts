import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';

//TODO: Add Validation
@ObjectType()
export class User {
  @Field()
  _id: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  email: string;
  @Field({ nullable: true })
  username: string;
  @Field(type => [String], {nullable: true})
  refreshToken: String[];

}

//TODO: Add Validation
@InputType()
export class CreateUserInput {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  email: string;
  @Field({ nullable: true })
  username: string;
  @Field()
  password:string;
  @Field(type => [String], {nullable: true})
  refreshToken: String[];
}


@InputType()
class UserInput {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  email: string;
  @Field()
  username: string;
}

//TO BE REMOVED
//@InputType()
//export class UpdateUserInput extends PartialType(CreateUserInput) {}

@InputType()
export class UserQueryInput extends PartialType(UserInput) {}
