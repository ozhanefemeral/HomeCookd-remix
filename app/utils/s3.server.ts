import { UploadHandler } from "@remix-run/server-runtime";
import { PassThrough } from "stream";

import AWS from "aws-sdk";
import { writeAsyncIterableToWritable } from "@remix-run/node";

const { S3_BUCKET_ACCESS_KEY_ID, S3_BUCKET_SECRET, S3_BUCKET_REGION, S3_BUCKET_NAME } =
  process.env;

if (
  !(S3_BUCKET_ACCESS_KEY_ID && S3_BUCKET_SECRET && S3_BUCKET_REGION && S3_BUCKET_NAME)
) {
  throw new Error(`Storage is missing required configuration.`);
}

const uploadStream = ({ Key }: Pick<AWS.S3.Types.PutObjectRequest, "Key">) => {
  const s3 = new AWS.S3({
    credentials: {
      accessKeyId: S3_BUCKET_ACCESS_KEY_ID,
      secretAccessKey: S3_BUCKET_SECRET,
    },
    region: S3_BUCKET_REGION,
  });
  const pass = new PassThrough();
  return {
    writeStream: pass,
    promise: s3.upload({ Bucket: S3_BUCKET_NAME, Key, Body: pass }).promise(),
  };
};

export async function uploadStreamToS3(data: any, filename: string) {
  const stream = uploadStream({
    Key: filename,
  });
  await writeAsyncIterableToWritable(data, stream.writeStream);
  const file = await stream.promise;
  return file.Location;
}

export const s3UploadHandler: UploadHandler = async ({
  name,
  filename,
  data,
}) => {
  if (name !== "image") {
    return undefined;
  }
  console.log("before");
  
  const uploadedFileLocation = await uploadStreamToS3(data, filename!);
  console.log(uploadedFileLocation);
  
  return uploadedFileLocation;
};