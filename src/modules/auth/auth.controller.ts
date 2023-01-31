import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { FacebookGuard } from "./guards/facebook.guard";
import { GoogleGuard } from "./guards/google.guard";


@Controller()
export class AuthController{
    constructor(private readonly authService: AuthService) {}


    @Get("/auth/google")
    @UseGuards(GoogleGuard)
    async googleAuth(@Req() req):Promise<any>{
    }

    @Get("/auth/google/callback")
    @UseGuards(GoogleGuard)
    async googleAuthRedirect(@Req() req, @Res({passthrough:true}) res):Promise<any>{
        return this.authService.googleAuth(req, res)
    }

    @Get("/auth/facebook")
    @UseGuards(FacebookGuard)
    async facebookAuth(@Req() req):Promise<any>{
    }

    @Get("/auth/facebook/callback")
    @UseGuards(FacebookGuard)
    async facebookAuthRedirect(@Req() req, @Res({passthrough:true}) res):Promise<any>{
        return this.authService.facebookAuth(req, res)
    }
}