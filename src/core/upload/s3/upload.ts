import { bufferFromBase64, uuidFilenameTransform } from "../../util";
import { IUpload } from "../model";

export class S3Uploader {
  private _s3: any;
  private _baseKey: any;
  private _filenameTransform: any;
  private _uploadParams: any;
  private _concurrencyOptions: any;
  private _specialChars = /[&\/\\#, +()$~%'":*?<>{}]/g;
  constructor(s3, config) {
    const {
      baseKey = "",
      uploadParams = {},
      concurrencyOptions = {},
      filenameTransform = uuidFilenameTransform, // (A)
    } = config;
    this._s3 = s3;
    this._baseKey = baseKey; // (B)
    this._filenameTransform = filenameTransform;
    this._uploadParams = uploadParams;
    this._concurrencyOptions = concurrencyOptions;
  }

  private async _processUpload(upload: IUpload): Promise<string> {
    let location = "";
    try {
      const res = await this._s3
        .upload({
          ...this._uploadParams, // (C)
          Body: upload.file,
          Key: `${this._baseKey || ""}${upload.filename}`,
          ContentType: upload.filetype,
        })
        .promise();

      location =
        res.Location.indexOf("https://") == 0 ||
        res.Location.indexOf("http://") == 0
          ? res.Location
          : `https://${res.Location}`;
    } catch (error) {}

    return location;
  }

  public async upload(stream: any, { filename, mimetype }) {
    const transformedFilename = this._filenameTransform(filename);
    const body = stream;
    const rs = await this._s3
      .upload(
        {
          ...this._uploadParams, // (C)
          Body: body,
          Key: `${this._baseKey || ""}${transformedFilename}`,
          ContentType: mimetype,
        },
        this._concurrencyOptions
      )
      .promise();

    return rs?.Location; // (D)
  }

  public async uploadBase64(
    base64: string,
    fileName: string,
    fileType: string
  ): Promise<string> {
    const base64Str = base64.split(";base64,").pop();
    const bufferImg = bufferFromBase64(base64Str);
    return await this._processUpload({
      file: bufferImg,
      filename: `${Date.now()}_${fileName.replace(this._specialChars, "_")}`,
      filetype: fileType,
    });
  }

  public async uploadBuffer(upload: IUpload): Promise<string> {
    return await this._processUpload({
      file: upload.file,
      filename: `${
        upload.disableTransformName ? "" : Date.now() + "_"
      }${upload.filename.replace(this._specialChars, "_")}`,
      filetype: upload.filetype,
    });
  }

  public async deleteFile(uri: string, dir?: string) {
    if (!uri) {
      return console.log("No avatar_url found to delete 😢");
    }
    const imageNames = uri.split("/");

    this._s3
      .deleteObject({
        Key: decodeURIComponent(imageNames[imageNames.length - 1]), // required
      })
      .promise(
        () => {},
        (err) => {
          throw Error("file not deleted...");
        }
      );
  }
}
