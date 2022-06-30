import AWS from "aws-sdk";
import { nanoid } from "nanoid";

class Storage {
  constructor(config) {
    this.config = config;
  }

  init() {
    const S3 = new AWS.S3(this.config);

    const upload = (file, metadata) =>
      new Promise((resolve, reject) => {
        const path = nanoid();
        S3.upload(
          {
            Key: path,
            Body: Buffer.from(file.buffer, "binary"),
            ACL: "public-read",
            ContentType: file.mime,
            Metadata: metadata //ext, language
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
              Key
            },
            (err, data) => {
              if (err) {
                return reject(err);
              }

              resolve(data);
            }
          );
        });
      }
    };
  }
}

const storage = new Storage({});

export default storage;
