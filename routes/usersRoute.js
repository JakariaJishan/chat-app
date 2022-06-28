const express = require("express");
const { getUsers, addUser } = require("../controllers/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidator,
  addUserValidatorHandler,
} = require("../middlewares/users/userValidator");
const router = express.Router();

router.get("/", decorateHtmlResponse("user"), getUsers);
router.post(
  "/",
  avatarUpload,
  addUserValidator,
  addUserValidatorHandler,
  addUser
);

module.exports = router;
