import { Prop } from "@nestjs/mongoose"
import { FileUploadType } from "./upload.interface";
import { Types } from "mongoose";

export class FileUploadObject{
    _id?: Types.ObjectId;

    @Prop({required:true})
    public_id: string;

    @Prop({required:true})
    format: string;

    @Prop({enum:FileUploadType, required:true})
    resource_type: FileUploadType;

    @Prop({required:true})
    bytes: number;

    @Prop({required:true})
    url: string;

    @Prop({required:true})
    secure_url: string;
}