import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService:AuthService){
        super()
    }

    async validate(username:string, password:string):Promise<any>{
        const user = await this.authService.validateUser(username, password)
        if(!user){
            throw new UnauthorizedException()
        }else if(!user.isEmailConfirmed){
            throw new UnauthorizedException("Account Not Activated")
        }
        
        return user
    }


}