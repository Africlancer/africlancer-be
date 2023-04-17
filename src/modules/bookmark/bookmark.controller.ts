import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { get } from 'http';
import { Controller } from "@nestjs/common";
import { BookmarkService } from "./bookmark.service";
import { BookMark } from './bookmark.schema';


@Controller({})
export class BookmarkController{
    constructor(private readonly BookmarkService: BookmarkService) {}

    @Post()
    public create(@Body() bookmark: BookMark): Promise<BookMark> {
      return this.BookmarkService.create(bookmark);
    }
  
    @Put()
    public async updateOne(_id: string, bookmark: BookMark): Promise<void> {
      this.BookmarkService.updateOne(_id, bookmark as any);
    }
  
    
    @Get('/all')
    public async find(): Promise<BookMark[]> {
      return this.BookmarkService.find({} as any);
    }
  
    @Delete(':id')
    public async delete(@Param() id: string): Promise<void> {
      await this.BookmarkService.delete(id);
    }
}