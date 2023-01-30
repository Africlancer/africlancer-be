import { AutoMap } from '@automapper/classes';
import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';

//TODO: Add Validation
@ObjectType()
export class User {
  @AutoMap()
  @Field()
  _id: string;

  @AutoMap()
  @Field({nullable:true})
  profileID: string;

  @AutoMap()
  @Field()
  firstName: string;

  @AutoMap()
  @Field()
  lastName: string;

  @AutoMap()
  @Field()
  email: string;

  @AutoMap()
  @Field()
  userName: string;

  @Field(type => [String], {nullable: true})
  refreshToken: String[];
  @Field(type => [String], {nullable: true})
  roles: String[];

}

//TODO: Add Validation
@InputType()
export class CreateUserInput {
  @AutoMap()
  @Field({nullable:true})
  profileID: string;

  @AutoMap()
  @Field()
  firstName: string;

  @AutoMap()
  @Field()
  lastName: string;

  @AutoMap()
  @Field()
  email: string;

  @AutoMap()
  @Field()
  userName: string;

  @AutoMap()
  @Field()
  password:string;

  @Field(type => [String], {nullable: true})
  refreshToken: String[];
  @Field(type => [String], {nullable: true})
  roles: String[];
}


@InputType()
class UserInput {
  @AutoMap()
  @Field()
  profileID: string;
  
  @AutoMap()
  @Field()
  firstName: string;

  @AutoMap()
  @Field()
  lastName: string;

  @AutoMap()
  @Field()
  email: string;

  @AutoMap()
  @Field()
  userName: string;
}

@InputType()
export class QueryUserInput extends PartialType(UserInput) {}
