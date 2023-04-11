export interface IThumbnail {
  base64: string;
  filename: string;
  filetype: string;
  width?: number;
  height?: number;
  quality?: number;
}

export interface IUpload {
  type?: "base64" | "buffer";
  file: any;
  filepath?: string;
  filename: string;
  filetype: string;
  disableTransformName?: boolean;
}
