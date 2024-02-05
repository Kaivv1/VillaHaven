/*eslint-disable no-undef */

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const crypto = require("crypto");

const uploadMulterSetup = () => {
  const multer = require("multer");
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });
  return upload;
};
const generateImageName = (bytes = 16) =>
  crypto.randomBytes(bytes).toString("hex");

const bucket = {
  name: process.env.BUCKET_NAME,
  region: process.env.BUCKET_REGION,
  access_key: process.env.ACCESS_KEY,
  secret_access_key: process.env.SECRET_ACCESS_KEY,
};

const s3 = new S3Client({
  credentials: {
    accessKeyId: bucket.access_key,
    secretAccessKey: bucket.secret_access_key,
  },
  region: bucket.region,
});

const uploadFile = async (fileBuffer, fileName, mimetype) => {
  const params = {
    Bucket: bucket.name,
    Body: fileBuffer,
    Key: fileName,
    ContentType: mimetype,
  };

  const command = new PutObjectCommand(params);

  return s3.send(command);
};

const deleteFile = async (fileName) => {
  const params = {
    Bucket: bucket.name,
    Key: fileName,
  };

  const command = new DeleteObjectCommand(params);

  return s3.send(command);
};

const getFile = async (fileName) => {
  const params = {
    Bucket: bucket.name,
    Key: fileName,
  };

  const command = new GetObjectCommand(params);

  const url = await getSignedUrl(s3, command, { expiresIn: 600000 });

  return url;
};

module.exports = {
  uploadMulterSetup,
  generateImageName,
  getFile,
  bucket,
  s3,
  uploadFile,
  deleteFile,
};

// const params = {
//   Bucket: bucket.name,
//   Key: randomImageName(),
//   Body: req.file.buffer,
//   ContentType: req.file.mimetype,
// };
// const command = new PutObjectCommand(params);

// await s3.send(command);

// const command = new GetObjectCommand(params);
// const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
