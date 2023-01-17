import { Param } from '@nestjs/common';
import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import {
  CreateUserInput,
  UpdateUserInput,
  User,
  UserQueryInput,
} from './user.model';

import { UserService } from './user.service';

const bookes = [
  { userId: '63c6889e7b0d771f909248ca', books: ['book 1', 'book 2', 'book 3'] },
];

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userSvc: UserService) {}

  @ResolveField()
  public books(user: User): String[] {
    return bookes.find((u) => u.userId === user._id.toString())?.books;
  }

  @Mutation((returns) => User, { name: 'createUser' })
  public async create(@Args('user') user: CreateUserInput): Promise<User> {
    return (await this.userSvc.create(user as any)) as any;
  }

  @Mutation((returns) => Boolean, { name: 'updateUser' })
  public async update(
    @Args('_id') _id: string,
    @Args('user') user: UpdateUserInput,
  ): Promise<boolean> {
    await this.userSvc.update(_id, user as any);
    return true;
  }

  @Query((returns) => User, { name: 'findOneUser' })
  public async findOne(@Args('query') query: UserQueryInput): Promise<User> {
    return (await this.userSvc.findOne(query as any)) as any;
  }

  @Query((returns) => [User], { name: 'findUsers' })
  public async find(@Args('query') query: UserQueryInput): Promise<User[]> {
    return (await this.userSvc.find(query as any)) as any;
  }

  @Query((returns) => Boolean, { name: 'deleteUser' })
  public async delete(@Args('_id') _id: string): Promise<true> {
    await this.userSvc.delete(_id);
    return true;
  }
}
