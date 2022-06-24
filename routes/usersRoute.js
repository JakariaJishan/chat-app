const express = require("express")
const { getUsers } = require("../controllers/usersController")
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse")
const router = express.Router()

router.get('/', decorateHtmlResponse('user'), getUsers)


module.exports = router