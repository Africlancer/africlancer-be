import { Prop } from "@nestjs/mongoose"
import { FileUploadType } from "./upload.interface";
import { Types } from "mongoose";

export class FileUploadObject{
    _id?: Types.ObjectId;

    @Prop({required:false})
    public_id?: string;

    @Prop({required:false})
    format?: string;

    @Prop({enum:FileUploadType, required:false})
    resource_type?: FileUploadType;

    @Prop({required:false})
    bytes?: number;

    @Prop({required:true})
    url: string;

    @Prop({required:true})
    secure_url: string;
}