import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Param } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
    CreateBookmarkInput,
    UpdateBookmarkInput,
    Bookmark,
    BookmarkQueryInput,
    QueryBookMarkInput,
} from './bookmark.model';
import { BookMark as BookmarkSchema } from './bookmark.schema';

import { BookmarkService } from './bookmark.service';

@Resolver((of) => Bookmark)
export class BookmarkResolver {
    constructor(private readonly BookmarkService: BookmarkService, @InjectMapper() private readonly classMapper: Mapper) { }

    @Mutation((returns) => Bookmark, { name: 'createBookmark' })
    public async create(@Args('portfolio') Bookmark: CreateBookmarkInput): Promise<Bookmark> {
        return (await this.BookmarkService.create(Bookmark as any)) as any;
    }

    @Mutation((returns) => Boolean, { name: 'updateBookmark' })
    public async update(
        @Args('_id') _id: string,
        @Args('Bookmark') bookmark: UpdateBookmarkInput,
    ): Promise<boolean> {
        // const queryMap = await this.classMapper.mapAsync(bookmark, UpdateBookmarkInput, BookmarkSchema)
        await this.BookmarkService.updateOne(_id, bookmark as any);
        return true;
    }
    @Query((returns) => [Bookmark], { name: 'findBookmark' })
    //    public async find(@Args('query') query: BookmarkQueryInput): Promise<Bookmark[]> 
    public async find(@Args('query') query: QueryBookMarkInput): Promise<Bookmark[]> {
        return (await this.BookmarkService.find(query as any)) as any;
    }

    @Query((returns) => Boolean, { name: 'deleteBookmark' })
    public async delete(@Args('_id') _id: string): Promise<true> {
        await this.BookmarkService.delete(_id);
        return true;
    }
}
