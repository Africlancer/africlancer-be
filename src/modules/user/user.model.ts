import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { Role } from '../auth/roles.enum';

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
  @Field(type => [String], {defaultValue: [Role.USER]})
  roles: String[];

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
  @Field(type => [String], {defaultValue: [Role.USER]})
  roles: String[];
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

@InputType()
export class QueryUserInput extends PartialType(UserInput) {}
