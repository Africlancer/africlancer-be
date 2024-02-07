import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


export type BookMarkDocument = HydratedDocument<BookMark>;

@Schema({collection:"bookmark"})
export class BookMark{
    _id: Types.ObjectId;

    @Prop({required:true})
    userID: Types.ObjectId;

    @Prop({required:true})
    projectID: Types.ObjectId;
}


export const BookmarkSchema = SchemaFactory.createForClass(BookMark)


export class PageResult<T> {
    totalRecords: number;
    data: Array<T>;
}

export class PageParams {
    skip?: number;
    limit?: number;
    keyword?: string;
}

export const handlePageFacet = (page: PageParams) => {
    return {
        $facet: {
            data: [{ $skip: Number(page.skip) }, { $limit: Number(page.limit) }],
            totalRecords: [{ $count: "count" }],
        },
    };
};

export const handlePageResult = (res: any) => {
    let rs = res[0] as any;
    if (rs.totalRecords.length)
        rs = { ...rs, totalRecords: rs.totalRecords[0].count };
    else rs = { ...rs, totalRecords: 0 };

    return rs;
};