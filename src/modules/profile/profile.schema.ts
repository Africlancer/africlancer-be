import { AutoMap } from "@automapper/classes";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, now, Types } from "mongoose";
import defaultValue from "./defaults"
import { ReviewType } from "./profile.enum";
import { FileUploadObject } from "../upload/upload.schema";

export type ProfileDocument = HydratedDocument<Profile>

@Schema()
export class Profile{
    @AutoMap()
    _id:Types.ObjectId;

    @AutoMap()
    @Prop()
    userID: Types.ObjectId;

    @AutoMap()
    @Prop()
    avatar: FileUploadObject;

    @AutoMap()
    @Prop({default:defaultValue().banner})
    banner: FileUploadObject;

    @AutoMap()
    @Prop({required:true,default:defaultValue().location})
    location:string;

    @AutoMap()
    @Prop({required:true,default:defaultValue().hourlyRate})
    hourlyRate:number;

    @AutoMap()
    @Prop({required:true, default:defaultValue().professionalHeadline})
    professionalHeadline:string;

    @AutoMap()
    @Prop({required:true, default:defaultValue().summary})
    summary:string;

    @AutoMap()
    @Prop({default:now()})
    createdAt:Date;

    @AutoMap()
    @Prop({default:now()})
    updatedAt:Date;

    @AutoMap()
    @Prop({required:true, default:defaultValue().recommendations})
    recommendations:number;

    @Prop()
    education: Array<Education>

    @Prop()
    publication: Array<Publication>

    @Prop()
    experience: Array<Experience>

    @Prop()
    qualification: Array<Qualification>

    @Prop()
    review: Array<Review>

    @Prop()
    skills: Array<String>;

    @Prop({required:true, default:defaultValue().rating})
    clientRating: number;

    @Prop({required:true, default:defaultValue().rating})
    freelancerRating: number;
    
    @Prop()
    flagURL: string;

    @Prop()
    fullName: string;

    @Prop()
    minRate:number;

    @Prop()
    maxRate:number;
}


export class Education{
    @AutoMap()
    _id: Types.ObjectId;

    @AutoMap()
    @Prop({})
    country:string;

    @AutoMap()
    @Prop({})
    insitution:string;

    @AutoMap()
    @Prop({})
    degree:string;
    
    @AutoMap()
    @Prop({})
    startYear:number;

    @AutoMap()
    @Prop({})
    endYear:number;

    @AutoMap()
    @Prop({})
    profileId:string;
}

export class Experience{
    @AutoMap()
    _id: Types.ObjectId;

    @AutoMap()
    @Prop({})
    title:string;

    @AutoMap()
    @Prop({})
    company:string;

    @AutoMap()
    @Prop({})
    startMonth:string;
    
    @AutoMap()
    @Prop({})
    startYear:number;

    @AutoMap()
    @Prop({})
    endMonth:string;

    @AutoMap()
    @Prop({})
    endYear:number;

    @AutoMap()
    @Prop({})
    working:boolean;

    @AutoMap()
    @Prop({})
    summary:string;

    @AutoMap()
    @Prop({})
    profileId:string;
}

export class Qualification{
    @AutoMap()
    _id: Types.ObjectId;

    @AutoMap()
    @Prop({})
    title:string;

    @AutoMap()
    @Prop({})
    conferringOrganization:string;

    @AutoMap()
    @Prop({})
    summary:string;
    
    @AutoMap()
    @Prop({})
    startYear:number;

    @AutoMap()
    @Prop({})
    profileId:string;
}

export class Publication{
    @AutoMap()
    _id: Types.ObjectId;

    @AutoMap()
    @Prop({})
    title:string;

    @AutoMap()
    @Prop({})
    publisher:string;

    @AutoMap()
    @Prop({})
    summary:string;
    
    @AutoMap()
    @Prop({})
    profileId:string;
}

export class Review{
    @AutoMap()
    _id: Types.ObjectId;

    @AutoMap()
    @Prop({type: ReviewType, required: true})
    type:ReviewType;

    @AutoMap()
    @Prop({required: true})
    rating:number;

    @AutoMap()
    @Prop({required: true})
    summary:string;
    
    @AutoMap()
    @Prop({required: true})
    profileId:string;

    @AutoMap()
    @Prop({required: true})
    reviewerId:string;

    @AutoMap()
    @Prop({required: true})
    projectId:string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile)


ProfileSchema.pre("save", function(){
    this.updatedAt = now()
})

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