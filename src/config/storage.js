import AWS from "aws-sdk";
import { Buffer } from "buffer";
import { nanoid } from "nanoid";

class Storage {
  constructor(config) {
    this.config = config;
  }

  init() {
    const S3 = new AWS.S3(this.config);

    const upload = (file, metadata, Bucket = "paste-hub") =>
      new Promise((resolve, reject) => {
        const path = nanoid();
        S3.upload(
          {
            Key: path,
            Body: Buffer.from(file.text, "binary"),
            ACL: "public-read",
            Bucket,
            ContentType: file.mime,
            Metadata: metadata, //ext, language
          },
          (err, data) => {
            if (err) {
              return reject(err);
            }

            resolve(data);
          }
        );
      });

    const getObject = (Key, Bucket = "paste-hub") =>
      new Promise((resolve, reject) => {
        S3.getObject({ Bucket, Key }, (err, data) => {
          if (err) {
            return reject(err);
          }

          resolve(data);
        });
      });

    return {
      upload,
      getObject,
      delete(Key, Bucket = "paste-hub") {
        return new Promise((resolve, reject) => {
          S3.deleteObject(
            {
              Bucket,
              Key,
            },
            (err, data) => {
              if (err) {
                return reject(err);
              }

              resolve(data);
            }
          );
        });
      },
    };
  }
}

const {
  REACT_APP_LINODE_ENDPOINT,
  REACT_APP_LINODE_REGION,
  REACT_APP_LINODE_ACCESS_KEY_ID,
  REACT_APP_LINODE_SECRET_ACCESS_KEY,
} = process.env;

export const storage = new Storage({
  endpoint: REACT_APP_LINODE_ENDPOINT,
  region: REACT_APP_LINODE_REGION,
  credentials: {
    accessKeyId: REACT_APP_LINODE_ACCESS_KEY_ID,
    secretAccessKey: REACT_APP_LINODE_SECRET_ACCESS_KEY,
  },
});
