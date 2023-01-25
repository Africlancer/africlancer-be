//TODO: Add validation

import { Field, InputType, ObjectType, PartialType } from "@nestjs/graphql";
import { User } from "../user/user.model";

@ObjectType()
export class Details extends PartialType(User){}

@ObjectType()
export class LoginResponse{
    @Field()
    access_token: string;

    @Field()
    refresh_token: string;

    @Field(()=> Details)
    details: Details;

}

@InputType()
export class UserSignUp {
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
}

@InputType()
export class UserSignIn{
    @Field()
    username:string;

    @Field()
    password:string;
}

@InputType()
export class UserChangePassword{
    @Field()
    oldPassword:string;

    @Field()
    newPassword:string;
}