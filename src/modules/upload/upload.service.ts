import { Injectable } from "@nestjs/common";
import { FileUploadType, IUploadResponse } from "./upload.interface";
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

    public async deleteFiles(public_id: string, resource_type: FileUploadType): Promise<boolean>{
        return this.cloudinaryService.deleteFile(public_id, resource_type);
    }
}