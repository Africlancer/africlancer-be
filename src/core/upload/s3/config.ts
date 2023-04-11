import dotenv from "dotenv";
dotenv.config();
import aws from "aws-sdk";

const config = {
  s3: {
    endpoint: new aws.Endpoint(process.env.aws_s3_endpoint),
    credentials: {
      accessKeyId: process.env.aws_access_key_id,
      secretAccessKey: process.env.aws_secret_access_key,
    },
    region: process.env.aws_s3_region,
    params: {
      ACL: "public-read",
      Bucket: process.env.aws_bucket,
    },
  },
  app: {
    storageDir: "tmp",
  },
};

export default config;
