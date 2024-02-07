import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Param, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
    CreateBookmarkInput,
    Bookmark,
    QueryBookMarkInput,
    BookmarkPageResult,
    BookmarkPageInput,
} from './bookmark.model';
import { BookMark as BookmarkSchema } from './bookmark.schema';

import { BookmarkService } from './bookmark.service';
import { GqlJwtGuard } from '../auth/guards/gql.jwt.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles.enum';

@Resolver((of) => Bookmark)
export class BookmarkResolver {
    constructor(private readonly BookmarkService: BookmarkService, @InjectMapper() private readonly classMapper: Mapper) { }

    @Mutation((returns) => Bookmark, { name: 'createBookmark' })
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    public async create(@Args('bookmark') Bookmark: CreateBookmarkInput): Promise<Bookmark> {
        return (await this.BookmarkService.create(Bookmark as any)) as any;
    }

    @Mutation((returns) => Boolean, { name: 'updateBookmark' })
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    public async update(
        @Args('_id') _id: string,
        @Args('bookmark') bookmark: QueryBookMarkInput,
    ): Promise<boolean> {
        // const queryMap = await this.classMapper.mapAsync(bookmark, UpdateBookmarkInput, BookmarkSchema)
        await this.BookmarkService.updateOne(_id, bookmark as any);
        return true;
    }
    @Query((returns) => [Bookmark], { name: 'findBookmark' })
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    //    public async find(@Args('query') query: BookmarkQueryInput): Promise<Bookmark[]> 
    public async find(@Args('bookmark') query: QueryBookMarkInput): Promise<Bookmark[]> {
        return (await this.BookmarkService.find(query as any)) as any;
    }

    @Query((returns) => Boolean, { name: 'deleteBookmark' })
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    public async delete(@Args('_id') _id: string): Promise<true> {
        await this.BookmarkService.delete(_id);
        return true;
    }

    @Query((returns) => BookmarkPageResult, { name: 'bookmarkPage' })
    @UseGuards(GqlJwtGuard)
    @Roles(Role.USER)
    public async page(@Args('query') query: QueryBookMarkInput, @Args("page") page: BookmarkPageInput) {
      return this.BookmarkService.page(query as any, page);
    }
}
