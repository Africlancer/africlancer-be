import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookmarkResolver } from './bookmark.resolver';
import { BookmarkRepository } from './bookmark.repository';
import { BookMark, BookmarkSchema } from './bookmark.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BookMark.name, schema: BookmarkSchema }]),
  ],
  controllers: [BookmarkController],
  providers: [BookmarkResolver, BookmarkService, BookmarkRepository],
})
export class BookmarkModule {}

