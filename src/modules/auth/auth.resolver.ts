import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Response } from 'express';
import { User } from '../user/user.model';
import { LoginResponse, UserSignIn, UserSignUp } from './auth.model';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';

//TODO: Mapping
//TODO: user Faceboook OAuth: signup and login
@Resolver()
export class AuthResolver {
    constructor(private readonly authService:AuthService){}

    @Mutation(returns => User, {name: "userSignUp"})
    signup(@Args("user") signupDetails:UserSignUp):Promise<User>{
        return this.authService.signup(signupDetails) as any
    }

    @Mutation(returns => LoginResponse, {name: "userSignIn"})
    @UseGuards(LocalGuard)
    signin(@Args("user") loginDetails:UserSignIn, @Context("res") res:Response):Promise<LoginResponse>{
        return this.authService.signin(loginDetails, res)
    }

    @Mutation(returns => Boolean, {name:"userSignOut"})
    signout(@Context("res") res:Response){
        this.authService.signout(res)
        return true;
    }
}
