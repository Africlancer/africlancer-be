import { Controller, Get, Param } from "@nestjs/common";
import { get } from "http";


@Controller("/user")
export class UserController{


    @Get(":id")
    public getUserById (@Param() id: string){

        return id;
    }
}