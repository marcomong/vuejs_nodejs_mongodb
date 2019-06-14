const User = require('../models/User')
const log = require('../models/Logger')
const passport = require('passport')

async function register (req, res) {
const {body} = req

User.register(body).then(async (result) => {
  res.status(200).send(result)
}).catch(async (err) => {
  log.error(err)
  if (err.code === 11000) {
    res.status(400).send({
      error: 'Email already registered'
    })
  } else {
    res.status(500).send({
      error: 'Generic error'
    })
  }
})
}

async function login (req, res, next) {
  const {body} = req
  User.findByEmail(body.email)
    .then(async (result) => {
      if (!result) {
        log.error('User not registered for log in', body)
        res.status(400).send({
          error: 'Email not registered!'
        })
      } else {
        return passport.authenticate('local', { session: false }, async (err, user, info) => {
          if (err) {
            log.error(err)
            res.status(500).send({
              error: 'Error while authenticating.'
            })
          }

          if (user) {
            return res.status(200).send(user.toAuthJSON(user.hash, true))
          } else {
            return res.status(401).send(info)
          }
        })(req, res, next)
      }
    })
    .catch((err) => {
      log.error(err)
      res.status(500).send({
        error: 'Generic error'
      })
    })
}

function refreshToken (req, res) {
  const {user} = req
  res.status(200).send({
    token: user.toAuthJSON(user.hash).token
  })
} 

module.exports.refreshToken = refreshToken
module.exports.register = register
module.exports.login = login

