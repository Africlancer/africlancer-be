import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { User as UserSchema } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { LoginResponse, UserChangePassword, UserSignIn, UserSignUp } from './auth.model';
import * as argon from 'argon2';
import { Response } from 'express';
import { Types } from 'mongoose';

//TODO: Mapping
//TODO: user Faceboook OAuth: signup and login
//TODO: user Google OAuth: signup and login

@Injectable()
export class AuthService {
    constructor(private readonly userService:UserService, private jwt:JwtService){}

    async validateUser(username:string, password: string):Promise<UserSchema>{
        const checkUser = await this.userService.findOneAuth({username:username, email:username})
        if(!checkUser){
            throw new ForbiddenException("Invalid Username Or Password")
        }

        if(await argon.verify(checkUser.password, password)){
            delete checkUser.password
            return checkUser
        }else{
            throw new ForbiddenException("Invalid Username Or Password")
        }
        
    }

    async signup(user:UserSignUp):Promise<UserSchema>{
        const checkUser = await this.userService.findOne({email:user.email})
        if(checkUser){
            throw new ForbiddenException("User Already Exists")
        }
        
        const splitEmail = user.email.split("@")
        const username = splitEmail[0]+(Math.floor(Math.random() * 90000) + 1)
        user.username = username
        user.password = await argon.hash(user.password)
        const newUser = await this.userService.create(user as any)

       return newUser
    }

    async signin(user:UserSignIn, res:Response):Promise<LoginResponse>{
        const access_token = await this.jwt.signAsync({usernameOrEmail:user.username}, {
            expiresIn: "15m",
            secret: process.env.ACCESS_TOKEN_SECRET
        })
        const refresh_token = await this.jwt.signAsync({usernameOrEmail:user.username}, {
            expiresIn: "7d",
            secret: process.env.REFRESH_TOKEN_SECRET
        })
        res.cookie("refresh_token", refresh_token, {
            httpOnly: true,
            //path:"/",
            secure: true
        })
        return {access_token, refresh_token, details:user}
    }

    async signout(res:Response):Promise<void>{
        res.cookie("refresh_token", "", {maxAge : 1})
    }

    
    async resetPassword(id:string, resetData:UserChangePassword):Promise<void>{
        const user = await this.userService.findOne({_id: new Types.ObjectId(id)})

        if(!user){
            throw new ForbiddenException("Invalid User")
        }

        if(await argon.verify(user.password, resetData.oldPassword)){
            const hashPassword = await argon.hash(resetData.newPassword)
            return await this.userService.update(id, {password: hashPassword})
        }else{
            throw new ForbiddenException("Invalid Password")
        }
    }

    async deleteAccount(id:string):Promise<void>{
        const user = await this.userService.findOne({_id: new Types.ObjectId(id)})

        if(!user){
            throw new ForbiddenException("Invalid User")
        }

        await this.userService.delete(id)

    }

    async refresh(){}
}
