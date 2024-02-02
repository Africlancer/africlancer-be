export interface IUploadResponse{
    public_id: string,
    format: string,
    resource_type: FileUploadType,
    bytes: number,
    url: string,
    secure_url: string
}

export enum FileUploadType{
    IMAGE = "image",
    VIDEO = "video",
    RAW = "raw"
}

export enum FileUploadFolders{
    IMAGES = "Africlancer_Images",
    VIDEOS = "Africlancer_Videos",
    FILES = "Africlancer_Raw_Files"
}

export interface ICloudinaryUploadConfig{
    resource_type?: string,
    folder?: string
}

export interface IFileStream{
    fieldName: string,
    filename: string,
    mimetype: string,
    encoding: string,
    createReadStream: Function
}