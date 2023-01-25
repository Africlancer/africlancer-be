import { Param, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { JwtGuard } from '../auth/guards/jwt.guard';
import {
  CreateUserInput,
  UpdateUserInput,
  User,
  UserQueryInput,
} from './user.model';

import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userSvc: UserService) {}

  //TODO: Add Mapping
  // @Mutation((returns) => User, { name: 'createUser' })
  // public async create(@Args('user') user: CreateUserInput): Promise<User> {
  //   return (await this.userSvc.create(user as any)) as any;
  // }

  //TODO: Add Mapping
  @UseGuards(JwtGuard)
  @Mutation((returns) => Boolean, { name: 'updateUser' })
  public async update(
    @Args('_id') _id: string,
    @Args('user') user: UpdateUserInput,
  ): Promise<boolean> {
    await this.userSvc.update(_id, user as any);
    return true;
  }

  //TODO: Add Mapping
  @Query((returns) => User, { name: 'findOneUser' })
  public async findOne(@Args('query') query: UserQueryInput): Promise<User> {
    return (await this.userSvc.findOne(query as any)) as any;
  }

  //TODO: Add Mapping
  @Query((returns) => [User], { name: 'findUsers' })
  public async find(@Args('query') query: UserQueryInput): Promise<User[]> {
    return (await this.userSvc.find(query as any)) as any;
  }

  //TODO: Add Mapping
  @UseGuards(JwtGuard)
  @Query((returns) => Boolean, { name: 'deleteUser' })
  public async delete(@Args('_id') _id: string): Promise<true> {
    await this.userSvc.delete(_id);
    return true;
  }
}
