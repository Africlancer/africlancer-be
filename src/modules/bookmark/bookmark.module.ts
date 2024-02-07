import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookmarkResolver } from './bookmark.resolver';
import { BookmarkRepository } from './bookmark.repository';
import { BookMark, BookmarkSchema } from './bookmark.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BookMark.name, schema: BookmarkSchema }]),
    AuthModule
  ],
  controllers: [BookmarkController],
  providers: [BookmarkResolver, BookmarkService, BookmarkRepository],
})
export class BookmarkModule {}

