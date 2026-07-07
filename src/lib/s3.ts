import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.AWS_S3_BUCKET!;

export async function uploadToS3(params: {
  buffer: Buffer;
  key: string;
  contentType: string;
}): Promise<string> {
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: params.key,
    Body: params.buffer,
    ContentType: params.contentType,
  }));
  return `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.key}`;
}

export async function getPresignedUrl(key: string, expiresIn = 3600) {
  return getSignedUrl(s3, new GetObjectCommand({ Bucket: BUCKET, Key: key }), { expiresIn });
}