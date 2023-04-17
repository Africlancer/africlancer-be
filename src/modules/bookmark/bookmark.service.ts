import { Injectable } from '@nestjs/common';
import { BookmarkRepository } from './bookmark.repository';
import { BookMark } from './bookmark.schema';

@Injectable()
export class BookmarkService {
  constructor(private readonly BookmarkRepo: BookmarkRepository) {}

  public create(bookmark: BookMark): Promise<BookMark> {
    return this.BookmarkRepo.create(bookmark as any);
  }

  public async updateOne(_id: string, bookMark: Partial<BookMark>): Promise<void> {
    this.BookmarkRepo.updateOne(_id, bookMark as any);
  }

  public async find(portfolio: Partial<BookMark>): Promise<BookMark[]> {
    return this.BookmarkRepo.find(BookMark as any);
  }

  public async delete(_id: string): Promise<void> {
    await this.BookmarkRepo.delete(_id);
  }
}
function useParams<T>(): { digits: any; } {
  throw new Error('Function not implemented.');
}


