const express = require("express")
const { getLogIn } = require("../controllers/loginController")
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse")
const router = express.Router()

router.get('/',decorateHtmlResponse('login'), getLogIn)


module.exports = router