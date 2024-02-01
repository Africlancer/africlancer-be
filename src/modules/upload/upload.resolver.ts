import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { FileUploadObject, UploadFileInput } from "./upload.model";
import { FileUploadService } from "./upload.service";
import { FileUploadType } from "./upload.interface";

@Resolver()
export class FileUploadResolver{
    constructor(private uploadSvc:FileUploadService){}

    @Mutation(()=> Boolean, {name: "uploadFile"})
    public async upload(@Args("upload") upload: UploadFileInput){
        await this.uploadSvc.uploadFile(upload.upload);
        return true;
    }
}