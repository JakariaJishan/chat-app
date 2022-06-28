const multer = require("multer");
const path = require("path");
const createError = require("http-errors");


function uploader(sub_folderPath, allowed_file_types, max_filesize, err_msg) {
  const UPLOAD_FOLDER = `${__dirname}/../public/upload/${sub_folderPath}`;

  //define disk storage

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOAD_FOLDER);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const filename =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();
      cb(null, filename + fileExt);
    },
  });

  //upload object creation...
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_filesize,
    },
    fileFilter: (req, file, cb) => {
      if (allowed_file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(err_msg));
      }
    },
  });

  return upload;
}

module.exports = uploader;
