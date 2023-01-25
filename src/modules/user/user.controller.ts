import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from './user.schema';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userSvc: UserService) {}

  @Post()
  public create(@Body() user: User): Promise<User> {
    return this.userSvc.create(user);
  }

  @Put()
  public async update(_id: string, user: User): Promise<void> {
    this.userSvc.update(_id, user);
  }

  @Get('retrieve/:id')
  public async findOne(@Param() id: string): Promise<User> {
    return this.userSvc.findOne({ _id: id } as any);
  }

  @Get('/all')
  public async find(): Promise<User[]> {
    return this.userSvc.find({} as any);
  }

  @Delete(':id')
  public async delete(@Param() id: string): Promise<void> {
    await this.userSvc.delete(id);
  }
}
