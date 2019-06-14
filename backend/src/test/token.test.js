process.env.NODE_ENV = 'test'

let User = require('../models/User')
let jwt = require('jsonwebtoken')
let config = require('../configuration/config')

//require dev dependencies
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../app')
let should = chai.should()

chai.use(chaiHttp)

const user = {
  name: 'nameTest',
  lastName: 'lastName',
  password: 'passwordTest',
  email: 'email@emailTest.com'
}

beforeEach((done) => { // before each test we empty the databse
  // console.log('clearing db...')
  User.deleteOne({
    email: user.email
  }, (err) => {
    done()
  })
})

describe('Token Methods', () => {

  it('POSITIVE - Gets token', () => {
    let userForTesting = new User(user)
    userForTesting.generateJWT().should.not.be.equal(null)
  })

  it('POSITIVE - Checks token', (done) => {
    let userForTesting = new User(user)
    userForTesting.token = userForTesting.generateJWT()
    try {
      var decoded = jwt.verify(userForTesting.token, config.security.jwtSecret)
      done()
    } catch (err) {
      done(err)
    }
  })

  it('NEGATIVE - Checks wrong token', (done) => {
    let userForTesting = new User(user)
    userForTesting.token = userForTesting.generateJWT(null)
    try {
      userForTesting.token = 'wrong token'
      var decoded = jwt.verify(userForTesting.token, config.security.jwtSecret)
      done(decoded)
    } catch (err) {
      done()
    }
  })

  it('NEGATIVE - Checks token expired token', (done) => {
    let userForTesting = new User(user)
    let token = userForTesting.generateJWT('secret')
    setTimeout(function () {
      try {
        var decoded = jwt.verify(token, 'secret')
        done(decoded)
      } catch (err) {
        done()
      }
    }, 20)
  })

})

describe('Token Api', () => {

  it('POSITIVE - /POST /auth/refreshToken.', (done) => {
    user.hash = 'hashPassword'
    let userForTesting = new User(user)

    userForTesting.save()
      .then((result, err) => {
        userForTesting = userForTesting.toAuthJSON(user.hash, true)
        if (err) done(err)
        chai.request(server)
          .post('/auth/refreshToken')
          .send(user)
          .set('Authorization', userForTesting.refreshToken)
          .set('_id', userForTesting._id)
          .end((err, res) => {
            if (err) done(err)
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('token')
            res.body.should.not.have.property('refreshToken')
            done()
          })
      })
  })

  it('NEGATIVE - /POST /auth/refreshToken with fake _id', (done) => {
    user.hash = 'hashPassword'
    let userForTesting = new User(user)

    userForTesting.save()
      .then((result, err) => {
        userForTesting = userForTesting.toAuthJSON(user.hash, true)
        userForTesting._id = userForTesting._id.toString().slice(2)
        userForTesting._id = 'a' + 'b' + userForTesting._id

        if (err) done(err)
        chai.request(server)
          .post('/auth/refreshToken')
          .send(user)
          .set('Authorization', userForTesting.refreshToken)
          .set('_id', userForTesting._id)
          .end((err, res) => {
            if (err) done(err)
            res.should.have.status(401)
            res.body.should.be.a('object')
            res.body.should.have.property('error')
            res.body.should.not.have.property('token')
            done()
          })
      })
  })

  it('NEGATIVE - /POST /auth/refreshToken with fake refreshToken', (done) => {
    user.hash = 'hashPassword'
    let userForTesting = new User(user)

    userForTesting.save()
      .then((result, err) => {
        userForTesting = userForTesting.toAuthJSON(user.hash, true)

        if (err) done(err)
        chai.request(server)
          .post('/auth/refreshToken')
          .send(user)
          .set('Authorization', 'fakeRefreshToken')
          .set('_id', userForTesting._id)
          .end((err, res) => {
            if (err) done(err)
            res.should.have.status(401)
            res.body.should.be.a('object')
            res.body.should.have.property('error')
            res.body.should.not.have.property('token')
            done()
          })
      })
  })


})