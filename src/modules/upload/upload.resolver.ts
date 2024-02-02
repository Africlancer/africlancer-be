import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UploadFileInput } from "./upload.model";
import { FileUploadService } from "./upload.service";

@Resolver()
export class FileUploadResolver{
    constructor(private uploadSvc:FileUploadService){}

    @Mutation(()=> Boolean, {name: "uploadFile"})
    public async upload(@Args("upload") upload: UploadFileInput){
        await this.uploadSvc.uploadFile(upload.upload);
        return true;
    }
}