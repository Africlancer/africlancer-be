import { createWriteStream, unlink, writeFile } from "fs";
import path from "path";
import { Readable } from "stream";
import { mkdir, uuidFilenameTransform } from "../util";
export class FilesystemUploader {
  private _filenameTransform: any;
  private _dir: any;
  constructor(config = {} as any) {
    const { dir = "", filenameTransform = uuidFilenameTransform } = config;
    this._dir = path.normalize(dir);
    this._filenameTransform = filenameTransform;
  }

  async upload(stream: Readable, { filename, mimetype, dir }) {
    const transformedFilename = this._filenameTransform(filename);

    mkdir(dir ? path.join(this._dir, dir) : this._dir);

    const filePath = path.resolve(
      this._dir,
      dir ? path.join(dir, transformedFilename) : transformedFilename
    );

    const writeStream = stream.pipe(createWriteStream(filePath));
    await new Promise((resolve, reject) => {
      writeStream.on("finish", () => {
        resolve(transformedFilename);
      });
    });

    return transformedFilename;
  }

  async uploadBase64(
    base64Str: string,
    fileName: string,
    oldFileName: string,
    fileDir?: string
  ): Promise<string> {
    let base64Image = base64Str.split(";base64,").pop();

    const dir = fileDir || this._dir;

    mkdir(dir);

    return new Promise((resolve, reject) => {
      writeFile(
        `${dir}${fileName}`,
        base64Image,
        { encoding: "base64" },
        (err) => {
          if (err) {
            console.log(
              JSON.stringify({
                msg: `Error occured while saving file: ${JSON.stringify(err)}`,
              })
            );
            reject({ msg: "Error occured while saving file" });
          }

          if (oldFileName)
            unlink(`${dir}${oldFileName}`, (err) => {
              resolve(fileName);
            });

          resolve(fileName);
        }
      );
    });
  }

  async deleteFile(fileName: string, fileLocation?: string) {
    let filePath = fileLocation || this._dir;
    return new Promise((resolve, reject) => {
      unlink(path.resolve(filePath, fileName), (err) => {
        resolve(fileName);
      });
    });
  }
}
