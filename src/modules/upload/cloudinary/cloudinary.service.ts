import { Injectable } from "@nestjs/common";
import { v2 as cloudinary } from "cloudinary";
import { FileUploadFolders, FileUploadType, ICloudinaryUploadConfig, IFileStream, IUploadResponse } from "../upload.interface";

@Injectable()
export class CloudinaryService{
    constructor(){
        cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true
        });
    }

    public async uploadFile(file: Promise<IFileStream>):Promise<IUploadResponse>{
        const uploadedFile: IFileStream = await file;
        const uploadedFileStream = await uploadedFile.createReadStream();
        
        let config: ICloudinaryUploadConfig = {
            resource_type: "auto"
        }

        if(uploadedFile.mimetype.includes(FileUploadType.IMAGE)){
            config.folder = FileUploadFolders.IMAGES
        }else if(uploadedFile.mimetype.includes(FileUploadType.VIDEO)){
            config.folder = FileUploadFolders.VIDEOS
        }else{
            config.folder = FileUploadFolders.FILES
        }

        let uploadRes: IUploadResponse;
        const upload = cloudinary.uploader.upload_stream({...config as any}, (err, callResult)=>{
            if(err){
                console.log(err.message);
            }else{
                const {bytes, format, public_id, resource_type, secure_url, url} = callResult;
                uploadRes = {
                    bytes,
                    format,
                    public_id,
                    resource_type: resource_type as any,
                    secure_url,
                    url
                }
            }
        });
        await uploadedFileStream.pipe(upload);
        return uploadRes;
    }

    public async deleteFile():Promise<boolean>{
        return true;
    }

}