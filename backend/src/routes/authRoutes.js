const express = require('express')
const router = express.Router()
const validator = require('../validate/validateToken')
const authController = require('../controllers/authenticationController')

router.post('/refreshToken', validator.authRefreshToken, authController.refreshToken)

module.exports = router