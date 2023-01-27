import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { User as UserSchema } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { LoginResponse, Tokens, UserChangePassword, UserSignIn, UserSignUp } from './auth.model';
import * as argon from 'argon2';
import { Response, Request } from 'express';
import { Types } from 'mongoose';

//TODO: Mapping
//TODO: user Faceboook OAuth: signup and login
//TODO: user Google OAuth: signup and login
//TODO: Role based Authorization

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
        const checkUser = await this.userService.findOneAuth({username:user.username, email:user.email})
        if(checkUser){
            throw new ForbiddenException("User Already Exists")
        }
        
        // const splitEmail = user.email.split("@")
        // const username = splitEmail[0]+(Math.floor(Math.random() * 90000) + 1)
        // user.username = username
        user.password = await argon.hash(user.password)
        const newUser = await this.userService.create(user as any)

       return newUser
    }

    async signin(user:UserSignIn, req:Request, res:Response):Promise<LoginResponse>{
        const cookies = req.cookies
        const checkUser = await this.userService.findOneAuth({username:user.username, email:user.username})

        const access_token = await this.jwt.signAsync({usernameOrEmail:checkUser.username, sub:checkUser._id}, {
            expiresIn: "15m",
            secret: process.env.ACCESS_TOKEN_SECRET
        })

        const refresh_token = await this.jwt.signAsync({usernameOrEmail:checkUser.username, sub:checkUser._id}, {
            expiresIn: "7d",
            secret: process.env.REFRESH_TOKEN_SECRET
        })

        if(cookies.refresh_token){
            const oldRefreshToken = req.cookies.refresh_token
            var newRefreshTokenArray = checkUser.refreshToken.filter(rt => rt !== oldRefreshToken)
            await this.userService.update(checkUser._id.toString(), {refreshToken: [...newRefreshTokenArray, refresh_token]})
        }else{

            await this.userService.update(checkUser._id.toString(), {refreshToken: [...checkUser.refreshToken, refresh_token]})
        }

        
        res.cookie("refresh_token", refresh_token, {
            httpOnly: true,
            sameSite:"none",
            secure: true
        })

        return {access_token, refresh_token, details:user}
    }

    async signout(req:Request, res:Response):Promise<void>{
        //delete access token from client

        //delete refresh token from db
        const cookies = req.cookies
        if(!cookies?.refresh_token){
            throw new UnauthorizedException() 
        }
        const oldRefreshToken = req.cookies.refresh_token

        const user = await this.userService.findOne({refreshToken:oldRefreshToken})
        if(!user){
            res.clearCookie("refresh_token", {httpOnly: true, sameSite:"none", secure: true})
            throw new ForbiddenException() 
        }

        const newRefreshTokenArray = user.refreshToken.filter(rt => rt !== oldRefreshToken)
        await this.userService.update(user._id.toString(), {refreshToken: [...newRefreshTokenArray]})
        //clear cookie
        res.clearCookie("refresh_token", {httpOnly: true, sameSite:"none", secure: true})

    }

    
    async changePassword(id:string, resetData:UserChangePassword):Promise<void>{
        const user = await this.userService.findOne({_id: new Types.ObjectId(id)})

        if(!user){
            throw new ForbiddenException("Invalid User")
        }

        if(await argon.verify(user.password, resetData.oldPassword)){
            const hashPassword = await argon.hash(resetData.newPassword)
            return await this.userService.update(id, {password: hashPassword})
        }else{
            throw new ForbiddenException("Current Password is Invalid")
        }
    }

    async deleteAccount(id:string):Promise<void>{
        const user = await this.userService.findOne({_id: new Types.ObjectId(id)})

        if(!user){
            throw new ForbiddenException("Invalid User")
        }

        await this.userService.delete(id)

    }

    async refresh(req:Request, res:Response):Promise<Tokens>{
        const cookies = req.cookies
        if(!cookies.refresh_token){
            throw new UnauthorizedException() 
        }
        const oldRefreshToken = req.cookies.refresh_token
        res.clearCookie("refresh_token", {httpOnly: true, sameSite:"none", secure: true})

        const user = await this.userService.findOne({refreshToken:oldRefreshToken})

        //reuse detection
        if(!user){
            const token = await this.jwt.verifyAsync(oldRefreshToken, {
                secret: process.env.REFRESH_TOKEN_SECRET
            }).catch(error => {throw new ForbiddenException()})
            const invalidUser = await this.userService.findOneAuth({username:token.usernameOrEmail, email:token.usernameOrEmail})
            console.log(invalidUser)
            if(!invalidUser){
                throw new ForbiddenException()
            }
            await this.userService.update(invalidUser._id.toString(), {refreshToken: []})
            throw new ForbiddenException()
        }
        

        const newRefreshTokenArray = user.refreshToken.filter(rt => rt !== oldRefreshToken)

        //evaluate refresh token 
        const decode = await this.jwt.verifyAsync(oldRefreshToken, {
            secret: process.env.REFRESH_TOKEN_SECRET
        }).catch(error =>{
            if(error || user._id !== decode.sub){
                this.userService.update(user._id.toString(), {refreshToken: [...newRefreshTokenArray]})
                throw new UnauthorizedException()
            }
        })


        //everything checks out, send access and refresh token again

        const access_token = await this.jwt.signAsync({usernameOrEmail:user.username}, {
            expiresIn: "15m",
            secret: process.env.ACCESS_TOKEN_SECRET
        })
        const refresh_token = await this.jwt.signAsync({usernameOrEmail:user.username}, {
            expiresIn: "7d",
            secret: process.env.REFRESH_TOKEN_SECRET
        })
        await this.userService.update(user._id.toString(), {refreshToken: [...newRefreshTokenArray, refresh_token]})
        res.cookie("refresh_token", refresh_token, {
            httpOnly: true,
            sameSite:"none",
            secure: true
        })
        return {access_token, refresh_token}
    }
}