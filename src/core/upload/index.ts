import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import imageThumbnail from "image-thumbnail";
import { FilesystemUploader } from "./local";
import { IThumbnail } from "./model";
import { s3, S3Uploader } from "./s3";
@Injectable()
export class FileUploader {
  private static fileUploader: FileUploader;
  constructor(private readonly configSvc: ConfigService) {}

  private s3Upload() {
    return new S3Uploader(s3, {
      baseKey: `${process.env.aws_bucket_folder}/`,
      uploadParams: {
        CacheControl: "max-age:31536000",
        ContentDisposition: "inline",
      },
      filenameTransform: (filename) => filename,
    });
  }

  private localUpload() {
    return new FilesystemUploader({
      // (A)
      dir: this.configSvc.get("upload_dir"), // (B)
      filenameTransform: (filename) => `${Date.now()}_${filename}`, // (C)
    });
  }

  public async thumbnail(model: IThumbnail) {
    const base64Str = model?.base64?.split(";base64,").pop();

    return this.uploader.uploadBuffer({
      file: await imageThumbnail(base64Str, {
        percentage: 25,
        width: model.width,
        height: model.height,
      }),
      filename: model.filename,
      filetype: model.filetype,
      filepath: `${model.width}/${model.height}`,
      disableTransformName: true,
    });
  }

  async mapFiles(files) {
    let fls = [];
    if (files && files.length > 0) {
      for await (let file of files) {
        fls.push({
          name: file.filename,
          type: file.filetype,
          uri: await this.saveFile(
            file.base64Str,
            file.filename,
            file.filetype
          ),
        });
      }
    }
    return fls;
  }

  async saveFile(file, filename, fileType) {
    return await this.uploader.uploadBase64(file, filename, fileType);
  }

  public uploader = this.s3Upload();

  static getInstance(config: ConfigService): FileUploader {
    if (!this.fileUploader) {
      this.fileUploader = new FileUploader(config);
    }
    return this.fileUploader;
  }
}
