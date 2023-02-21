import { AutoMap } from "@automapper/classes";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, now, Types } from "mongoose";
import defaultValue from "./defaults"

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
    avatar:string;

    @AutoMap()
    @Prop({default:defaultValue().banner})
    banner:string;

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

export const ProfileSchema = SchemaFactory.createForClass(Profile)


ProfileSchema.pre("save", function(){
    this.updatedAt = now()
})