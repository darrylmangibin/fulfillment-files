export interface UploadedFileInput {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
  size: number;
}
export interface UploadResult {
  bucket: string;
  key: string;
  path: string;
  publicUrl: string;
  signedUrl: string;
  etag?: string;
}
