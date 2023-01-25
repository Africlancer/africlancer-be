import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Response } from 'express';
import { User } from '../user/user.model';
import { LoginResponse, UserChangePassword, UserSignIn, UserSignUp } from './auth.model';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';

//TODO: Mapping
//TODO: user Faceboook OAuth: signup and login
//TODO: user Google OAuth: signup and login

@Resolver()
export class AuthResolver {
    constructor(private readonly authService:AuthService){}

    @Mutation(returns => User, {name: "userSignUp"})
    async signup(@Args("user") signupDetails:UserSignUp):Promise<User>{
        return this.authService.signup(signupDetails) as any
    }

    @Mutation(returns => LoginResponse, {name: "userSignIn"})
    @UseGuards(LocalGuard)
    async signin(@Args("user") loginDetails:UserSignIn, @Context("res") res:Response):Promise<LoginResponse>{
        return this.authService.signin(loginDetails, res)
    }

    @Mutation(returns => Boolean, {name:"userSignOut"})
    @UseGuards(JwtGuard)
    async signout(@Context("res") res:Response){
        await this.authService.signout(res)
        return true;
    }

    @Mutation(returns => Boolean, {name:"userResetPassword"})
    @UseGuards(JwtGuard)
    async reset(@Args("id") id:string, @Args("resetData") resetData:UserChangePassword): Promise<Boolean>{
        await this.authService.resetPassword(id, resetData)
        return true;
    }

    
    @Query((returns) => Boolean, { name: "deleteUser" })
    @UseGuards(JwtGuard)
    async delete(@Args("id") id: string): Promise<Boolean> {
        await this.authService.deleteAccount(id);
        return true;
    }
}
