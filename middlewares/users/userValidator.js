const { check, validationResult } = require("express-validator");
const User = require("../../models/people");
const path = require("path");
const { unlink } = require("fs");

const addUserValidator = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("name must not contain anything other than alphabet")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError("email already in use");
        }
      } catch (error) {
        throw createError(error.message);
      }
    }),
  check("mobile")
    .isMobilePhone("bn-BD", {
      strictMode: true,
    })
    .withMessage("mobile number must be a bangladeshi mobile number")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value });
        if (user) {
          throw createError("mobile already in use");
        }
      } catch (error) {
        throw createError(error.message);
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage(
      "password must be at least 8 characters long and should contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol"
    ),
];

const addUserValidatorHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedError = errors.mapped();

  if (Object.keys(mappedError).length === 0) {
    next();
  } else {
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `/../public/upload/avatars/${filename}`),
        (err) => {
          if (err) console.log(err);
        }
      );

    }

    res.status(500).json({
        errors: mappedError
    })
  }
};

module.exports = {
  addUserValidator,
  addUserValidatorHandler,
};
