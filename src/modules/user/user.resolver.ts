import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User, QueryUserInput } from './user.model';
import { User as UserSchema } from './user.schema';
import { UserService } from './user.service';

import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles.enum';
import { GqlJwtGuard } from '../auth/guards/gql.jwt.guard';
import { GqlCurrentUser } from '../auth/decorators/gql.user.decorator';


@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userSvc: UserService, @InjectMapper() private readonly classMapper:Mapper) {}

  
  @UseGuards(GqlJwtGuard)
  @Roles(Role.USER)
  @Mutation((returns) => Boolean, { name: 'updateUser' })
  public async update(
    @Args('user') user: QueryUserInput,
    @GqlCurrentUser() userID:any,
  ): Promise<boolean> {
    const queryMap = await this.classMapper.mapAsync(user, QueryUserInput, UserSchema);
    await this.userSvc.update(userID.sub, queryMap);
    return true;
  }

  @Query((returns) => User, { name: 'findOneUser' })
  public async findOne(@Args('query') query: QueryUserInput): Promise<User> {
    return await this.classMapper.mapAsync(await this.userSvc.findOne(query as unknown), UserSchema, User);
  }

  @Query((returns) => [User], { name: 'findUsers' })
  public async find(@Args('query') query: QueryUserInput): Promise<User[]> {
    return this.classMapper.mapArrayAsync(await this.userSvc.find(query as unknown), UserSchema, User);
  }

}
