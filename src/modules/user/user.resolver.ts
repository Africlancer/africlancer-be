import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User, QueryUserInput } from './user.model';
import { User as UserSchema } from './user.schema';
import { UserService } from './user.service';

import { Roles } from '../auth/decorators/roles.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Role } from '../auth/roles.enum';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userSvc: UserService, @InjectMapper() private readonly classMapper:Mapper) {}

  @UseGuards(JwtGuard)
  @Roles(Role.USER)
  @Mutation((returns) => Boolean, { name: 'updateUser' })
  public async update(
    @Args('_id') _id: string,
    @Args('user') user: QueryUserInput,
  ): Promise<boolean> {
    const queryMap = await this.classMapper.mapAsync(user, QueryUserInput, UserSchema);
    await this.userSvc.update(_id, queryMap);
    //await this.userSvc.update(_id, user as any);
    return true;
  }

  @Query((returns) => User, { name: 'findOneUser' })
  public async findOne(@Args('query') query: QueryUserInput): Promise<User> {
    return await this.classMapper.mapAsync(await this.userSvc.findOne(query as unknown), UserSchema, User);
    //return (await this.userSvc.findOne(query as any)) as any;
  }

  @Query((returns) => [User], { name: 'findUsers' })
  public async find(@Args('query') query: QueryUserInput): Promise<User[]> {
    return this.classMapper.mapArrayAsync(await this.userSvc.find(query), UserSchema, User);
    //return (await this.userSvc.find(query as any)) as any;
  }

}
