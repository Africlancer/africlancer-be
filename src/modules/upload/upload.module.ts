import { Module } from "@nestjs/common";
import { FileUploadService } from "./upload.service";
import { FileUploadResolver } from "./upload.resolver";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";

@Module({
    imports:[CloudinaryModule],
    providers:[FileUploadService, FileUploadResolver],
    exports:[FileUploadService]
})
export class FileUploadModule{}