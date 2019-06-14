const mongoose = require('mongoose')
const log = require('./Logger')
const config = require('../configuration/config')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  name: String,
  lastName: String,
  salt: String,
  hash: String
})

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
}

UserSchema.methods.validatePassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
  return this.hash === hash
}

UserSchema.methods.generateJWT = function (secret, refreshToken = false) {
  if (refreshToken) {
    return jwt.sign({
      email: this.email,
      _id: this._id
    }, secret)
  } else {
    return jwt.sign({
      email: this.email,
      _id: this._id
    }, config.security.jwtSecret, {
      expiresIn: config.security.tokenLife
    })
  }
}

UserSchema.methods.toAuthJSON = function (hash, addRefreshToken = false) {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(hash),
    refreshToken: addRefreshToken ? this.generateJWT(hash, true) : null,
    name: this.name,
    lastName: this.lastName,
  }
}

module.exports = User = mongoose.model('User', UserSchema)

module.exports.register = (user) => {
  let newUser = new User(user)
  newUser.setPassword(user.password)

  return new Promise((resolve, reject) => {
    newUser.save().then(() => {
      resolve(newUser.toAuthJSON(newUser.hash, true))
    }).catch((err) => {
      reject(err)
    })
  })
}

module.exports.findByEmail = (email) => {
  const query = {
    email: email
  }
  return new Promise((resolve, reject) => {
    User.findOne(query)
      .then((result, err) => {
        if (err)
          reject(err)
        else
          resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}