const express = require('express')
const router = express.Router()
const auth = require('../validate/validateToken')

router.get('/amIAuth', auth.authToken, (req, res) => {
  res.status(200).send({
    result: 'ok! you are authorized'
  })
})

module.exports = router