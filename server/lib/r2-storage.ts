import {
  DeleteObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { mediaContentType } from "./media-utils";

export type StoredMediaItem = {
  name: string;
  url: string;
};

let client: S3Client | null = null;

export function isR2Configured(): boolean {
  return Boolean(
    process.env.R2_ACCOUNT_ID &&
      process.env.R2_ACCESS_KEY_ID &&
      process.env.R2_SECRET_ACCESS_KEY &&
      process.env.R2_BUCKET_NAME &&
      process.env.R2_PUBLIC_URL,
  );
}

function getR2Client(): S3Client {
  if (client) return client;

  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error("Missing R2 credentials");
  }

  client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });

  return client;
}

function bucketName(): string {
  const bucket = process.env.R2_BUCKET_NAME;
  if (!bucket) throw new Error("Missing R2_BUCKET_NAME");
  return bucket;
}

function objectKey(name: string): string {
  const prefix = (process.env.R2_KEY_PREFIX ?? "media").replace(/^\/+|\/+$/g, "");
  return prefix ? `${prefix}/${name}` : name;
}

export function getR2PublicUrl(name: string): string {
  const base = process.env.R2_PUBLIC_URL?.replace(/\/$/, "");
  if (!base) throw new Error("Missing R2_PUBLIC_URL");
  return `${base}/${objectKey(name)}`;
}

export async function uploadToR2(
  name: string,
  buffer: Buffer,
  contentType: string,
): Promise<StoredMediaItem> {
  const s3 = getR2Client();
  const key = objectKey(name);

  await s3.send(
    new PutObjectCommand({
      Bucket: bucketName(),
      Key: key,
      Body: buffer,
      ContentType: contentType || mediaContentType(name),
    }),
  );

  return { name, url: getR2PublicUrl(name) };
}

export async function listFromR2(): Promise<StoredMediaItem[]> {
  const s3 = getR2Client();
  const prefix = process.env.R2_KEY_PREFIX ?? "media";
  const normalizedPrefix = prefix.replace(/^\/+|\/+$/g, "");
  const listPrefix = normalizedPrefix ? `${normalizedPrefix}/` : "";

  const response = await s3.send(
    new ListObjectsV2Command({
      Bucket: bucketName(),
      Prefix: listPrefix,
      MaxKeys: 500,
    }),
  );

  const stripPrefix = listPrefix.length;

  return (response.Contents ?? [])
    .filter((item) => item.Key && item.Key !== listPrefix)
    .map((item) => {
      const key = item.Key!;
      const name = stripPrefix > 0 ? key.slice(stripPrefix) : key;
      return {
        name,
        url: `${process.env.R2_PUBLIC_URL?.replace(/\/$/, "")}/${key}`,
      };
    })
    .sort((a, b) => b.name.localeCompare(a.name));
}

export async function deleteFromR2(name: string): Promise<void> {
  const s3 = getR2Client();
  await s3.send(
    new DeleteObjectCommand({
      Bucket: bucketName(),
      Key: objectKey(name),
    }),
  );
}
