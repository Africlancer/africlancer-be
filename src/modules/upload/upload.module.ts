import { Module } from "@nestjs/common";
import { FileUploadService } from "./upload.service";
import { FileUploadResolver } from "./upload.resolver";

@Module({
    imports:[],
    providers:[FileUploadService, FileUploadResolver],
    exports:[FileUploadService]
})
export class FileUploadModule{}