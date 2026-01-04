/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  PutObjectCommandInput,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { extname } from "path";
import { v4 as uuidv4 } from "uuid";
import { UploadResult } from "@/modules/s3/types/s3-storage.type";
import { on } from "events";

export class S3StorageService {
  private client: S3Client | null = null;
  private readonly bucket: string;
  private readonly region: string;

  constructor() {
    const bucket = process.env.AWS_BUCKET as string;
    const region = process.env.AWS_DEFAULT_REGION as string;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID as string;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY as string;

    if (!bucket || !region || !accessKeyId || !secretAccessKey) {
      throw new Error("S3 is not configured");
    }

    this.bucket = bucket;
    this.region = region;
    this.client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  public async uploadBuffer(params: {
    file: Express.Multer.File;
    key?: string;
    signedUrlTtlSeconds?: number;
    onProgress?: (progress: number) => void;
  }): Promise<UploadResult> {
    try {
      if (!this.client) {
        throw new Error("S3 client not initialized");
      }

      const { file, onProgress } = params;
      const fileExtension = extname(file.originalname) || "";
      const key = params.key || `${uuidv4()}${fileExtension}`;

      let etag: string | undefined;

      if (onProgress) {
        const uploadParams: PutObjectCommandInput = {
          Bucket: this.bucket,
          Key: key,
          Body: file.buffer, // still OK — Upload wraps it as stream
          ContentType: file.mimetype,
          Metadata: {
            file_extension: fileExtension.replace(".", ""),
          },
        };

        const upload = new Upload({
          client: this.client,
          params: uploadParams,
        });

        upload.on("httpUploadProgress", (progress) => {
          if (!progress.total || !onProgress) return;
          const percent = Math.round(
            ((progress.loaded ?? 0) / progress.total) * 100
          );
          onProgress(percent);
        });

        const response = await upload.done();
        etag = typeof response.ETag === "string" ? response.ETag : undefined;
      } else {
        const command = new PutObjectCommand({
          Bucket: this.bucket,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
          Metadata: {
            file_extension: fileExtension.replace(".", ""),
          },
        });

        const response = await this.client.send(command);
        etag = typeof response.ETag === "string" ? response.ETag : undefined;
      }

      const signedUrlTtlSeconds = params.signedUrlTtlSeconds ?? 900;

      const getCmd = new GetObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });

      const signedUrl = await getSignedUrl(this.client, getCmd, {
        expiresIn: signedUrlTtlSeconds,
      });

      return {
        bucket: this.bucket,
        key,
        path: `s3://${this.bucket}/${key}`,
        publicUrl: this.getPublicUrl(key),
        signedUrl,
        etag,
      };
    } catch (error) {
      throw error;
    }
  }

  public getPublicUrl(key: string): string {
    return `https://s3.${this.region}.amazonaws.com/${
      this.bucket
    }/${encodeURIComponent(key)}`;
  }

  public async deleteObject(params: { key: string }): Promise<void> {
    try {
      // Step 1: Check if object exists
      if (!this.client) {
        throw new Error("S3 client not initialized");
      }

      await this.client.send(
        new HeadObjectCommand({ Bucket: this.bucket, Key: params.key })
      );
    } catch (err: any) {
      if (err.name === "NotFound") {
        throw new Error(`S3 object with key "${params.key}" does not exist`);
      }
      throw err; // other errors
    }

    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: params.key,
    });

    await this.client.send(command);
  }
}

export const s3StorageService = new S3StorageService();
