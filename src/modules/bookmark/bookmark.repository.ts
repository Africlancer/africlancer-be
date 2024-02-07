import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BookMark, BookMarkDocument, PageParams, PageResult, handlePageFacet, handlePageResult } from './bookmark.schema';

@Injectable()
export class BookmarkRepository {
  constructor(@InjectModel(BookMark.name) private bookMarkModel: Model<BookMarkDocument>) {}

  public create(bookmark: BookMark): Promise<BookMark> {
    const createBookmark = new this.bookMarkModel(bookmark);
    return createBookmark.save();
  }

  public async updateOne(_id: string, bookmark: Partial<BookMark>): Promise<void> {
    delete bookmark._id;
    await this.bookMarkModel.updateOne({ _id: new Types.ObjectId(_id)},BookMark);
  }

  public async find(userQuery: Partial<BookMark>): Promise<BookMark[]> {
    if(userQuery._id)
    userQuery._id = new Types.ObjectId(userQuery._id);
    return await this.bookMarkModel.find(userQuery);
  }

  public async delete(_id: string): Promise<void> {
    await this.bookMarkModel.deleteOne({ _id: new Types.ObjectId(_id) });
  }

  public async page(query: Partial<BookMark>, page: PageParams): Promise<PageResult<BookMark>> {
    return this.bookMarkModel.aggregate([
      {$match: query},
      { $sort: { createdAt: -1 } },
      { ...handlePageFacet(page) },
    ])
    .then(handlePageResult)
    .then((rs) => {
      return rs;
    });
  }


}
