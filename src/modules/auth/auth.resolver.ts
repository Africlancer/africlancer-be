import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Response, Request } from 'express';
import { User } from '../user/user.model';
import { LoginResponse, Tokens, UserChangePassword, UserSignIn, UserSignUp } from './auth.model';
import { AuthService } from './auth.service';
import { GqlCurrentUser } from './decorators/gql.user.decorator';
import { GqlGoogleGuard } from './guards/gql.google.guard';
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
    async signin(@Args("user") loginDetails:UserSignIn, @Context("req") req:Request, @Context("res") res:Response):Promise<LoginResponse>{
        return this.authService.signin(loginDetails, req, res)
    }

    @Mutation(returns => Boolean, {name:"userSignOut"})
    @UseGuards(JwtGuard)
    async signout(@Context("req") req:Request, @Context("res") res:Response){
        await this.authService.signout(req, res)
        return true;
    }

    @Mutation(returns => Boolean, {name:"userChangePassword"})
    @UseGuards(JwtGuard)
    async change(@GqlCurrentUser() user:any, @Args("resetData") resetData:UserChangePassword): Promise<boolean>{
        await this.authService.changePassword(user.sub, resetData)
        return true;
    }

    
    @Query((returns) => Boolean, { name: "deleteUser" })
    @UseGuards(JwtGuard)
    async delete(@GqlCurrentUser() user:any): Promise<boolean> {
        await this.authService.deleteAccount(user.sub);
        return true;
    }

    @Mutation((returns) => Tokens, { name: "getNewTokens" })
    async refresh(@Context("req") req:Request, @Context("res") res:Response):Promise<Tokens>{
        return await this.authService.refresh(req, res);
    }

    @Mutation(returns => Boolean, {name: "googleAuth"})
    @UseGuards(GqlGoogleGuard)
    async googleAuth(){
        //return this.authService.googleAuth(loginDetails, req, res)
    }
}
