const express = require('express')
const router = express.Router()
const authController = require('../controllers/authenticationController')
const validateUser = require('../validate/validateUser')

router.post('/signUp', validateUser.general, authController.register)
router.post('/signIn', validateUser.general, authController.login)

module.exports = router