import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


export type BidDocument = HydratedDocument<Bid>;

@Schema({collection:"bids"})
export class Bid{
    _id: Types.ObjectId;

    @Prop({required:true})
    userID: Types.ObjectId;

    @Prop({required:true})
    projectID: Types.ObjectId;

    @Prop({required:true})
    proposal: string;

    @Prop({required:true, default:false})
    isAwarded: boolean;
    
    @Prop()
    budget?: number;

    @Prop()
    hourlyRate?: number;

    @Prop({required:true})
    deliveredIn: number;

}


export const BidSchema = SchemaFactory.createForClass(Bid)

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