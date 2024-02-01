import { Field, ID, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload-ts";
import { FileUploadType } from "./upload.interface";

registerEnumType(FileUploadType, {
    name:"FileUploadType"
});

@ObjectType()
export class FileUploadObject{
    @Field((type) => ID, {nullable: true})
    _id?: string;

    @Field({})
    public_id: string;

    @Field({})
    format: string;

    @Field((type) => FileUploadType, {})
    resource_type: FileUploadType;

    @Field({})
    bytes: number;

    @Field({})
    url: string;

    @Field({})
    secure_url: string;
}

@InputType()
export class UploadFileInput{
    @Field((type) => GraphQLUpload, { nullable: true })
    upload?: FileUpload;
}

