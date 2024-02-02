import { Injectable } from "@nestjs/common";
import { IUploadResponse } from "./upload.interface";
import { CloudinaryService } from "./cloudinary/cloudinary.service";

@Injectable()
export class FileUploadService{
    constructor(
        private cloudinaryService: CloudinaryService
    ){}

    public async uploadFile(file: any):Promise<IUploadResponse>{
        return this.cloudinaryService.uploadFile(file);
    }

    public async uploadFiles(files: any[]):Promise<IUploadResponse[]>{
        let uploadedFiles:IUploadResponse[] = [];
        for(let file in files){
            uploadedFiles.push(await this.cloudinaryService.uploadFile(files[file]));
        }
        return uploadedFiles;
    }
}