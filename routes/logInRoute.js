const express = require("express")
const { getLogIn } = require("../controllers/loginController")
const router = express.Router()

router.get('/', getLogIn)


module.exports = router