const uploader = require("../../utils/singleUploader");

function avatarUpload(req, res, next) {
  const upload = uploader(
    "avatars",
    ["img/jpg", "img/jpeg", "img/png"],
    1000000,
    "only jpeg, jpg, png formats are allowed"
  );
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
}

module.exports = avatarUpload;
