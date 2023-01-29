import { Controller, Get, Req, UseGuards } from "@nestjs/common";
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
    //@UseGuards(AuthGuard("google"))
    async googleAuthRedirect(@Req() req):Promise<any>{
        return this.authService.googleAuth(req)
    }
}