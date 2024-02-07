import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { FileUploadObject, UploadFileInput } from "./upload.model";
import { FileUploadService } from "./upload.service";
import { Types } from "mongoose";

@Resolver()
export class FileUploadResolver{
    constructor(private uploadSvc:FileUploadService){}

    @Mutation(()=> Boolean, {name: "uploadFile"})
    public async upload(@Args("upload") upload: UploadFileInput){
        await this.uploadSvc.uploadFile(upload.upload);
        return true;
    }

    @Mutation(()=> [FileUploadObject], {name: "uploadFiles"})
    public async upload1(@Args("upload") upload: UploadFileInput){
        if(upload.uploads.length > 0){
            let filePayload = [] as any;
            filePayload = await this.uploadSvc.uploadFiles(upload.uploads);
            for(let file in filePayload){
                filePayload[file]._id = new Types.ObjectId();
                console.log(filePayload[file], "here");
            }
            upload.uploads = filePayload;
          }
        return upload.uploads;
    }
}