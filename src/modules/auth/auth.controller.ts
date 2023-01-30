import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { resolve } from "node:path/win32";
import { AuthService } from "./auth.service";
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
    async googleAuthRedirect(@Req() req):Promise<any>{
        return this.authService.googleAuth(req)
    }
}