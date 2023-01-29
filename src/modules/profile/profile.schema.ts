import { AutoMap } from "@automapper/classes";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, now, Types } from "mongoose";


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
    @Prop({required:true,default:0})
    hourlyRate:number;

    @AutoMap()
    @Prop({required:true, default:"I'm a freelancer"})
    professionalHeadline:string;

    @AutoMap()
    @Prop({required:true, default:"About my services"})
    summary:string;

    @AutoMap()
    @Prop({default:now()})
    createdAt:Date;

    @AutoMap()
    @Prop({default:now()})
    updatedAt:Date;

    @AutoMap()
    @Prop({required:true, default:0})
    recommendations:number;

    @Prop()
    educations: Array<Education>

}


export class Education{

    _id: Types.ObjectId;
    @AutoMap()
    @Prop({})
    schoolName:string

    @AutoMap()
    @Prop({})
    major:string
    
    @AutoMap()
    @Prop({})
    startDate:number;

    @AutoMap()
    @Prop({})
    endDate:number;

    profileId:string;
}



export const ProfileSchema = SchemaFactory.createForClass(Profile)


ProfileSchema.pre("save", function(){
    this.updatedAt = now()
})