const jwt = require('jsonwebtoken')
const config = require('../configuration//config')
const User = require('../models/User')

module.exports = {
  authToken: async function (req, res, next) {
    if (!req.headers.authorization) {
      res.status(401).send({
        error: 'Unauthorized. No authorization specified.'
      })
      return
    }

    try {
      let token = req.headers.authorization
      let decoded = jwt.verify(token, config.security.jwtSecret)
      req.claimedUserId = decoded._id
      next()
    } catch (err) {
      res.status(401).send({
        error: 'Unauthorized. Try logging again'
      })
      return
    }
  },
  authRefreshToken: async function (req, res, next) {
    if (!req.headers.authorization || !req.headers._id) {
      res.status(401).send({
        error: 'Unauthorized. No authorization specified.'
      })
      return
    }
    try {
      let token = req.headers.authorization
      let _id = req.headers._id
      User.findById(_id)
        .then((result, err) => {
          if (err || !result) {
            res.status(401).send({
              error: 'Unauthorized. Try logging again.'
            })
            return
          } else {
            try {
              let decoded = jwt.verify(token, result.hash)
              req.user = result
              next()
            } catch (err) {
              res.status(401).send({
                error: 'Unauthorized. Try logging again'
              })
              return
            }
          }
        })
    } catch (err) {
      res.status(401).send({
        error: 'Unauthorized. Try logging again'
      })
      return
    }
  }
}