import { AutoMap } from '@automapper/classes';
import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';

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
  username: string;

  @Field(type => [String], {nullable: true})
  refreshToken: String[];
  @Field(type => [String], {nullable: true})
  roles: String[];

}

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
  username: string;

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
  @Field({nullable: true})
  profileID: string;
  
  @AutoMap()
  @Field({nullable: true})
  firstName: string;

  @AutoMap()
  @Field({nullable: true})
  lastName: string;

  @AutoMap()
  @Field({nullable: true})
  email: string;

  @AutoMap()
  @Field({nullable: true})
  username: string;
}

@InputType()
export class QueryUserInput extends UserInput {}
