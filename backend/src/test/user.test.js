process.env.NODE_ENV = 'test'

let User = require('../models/User')

//require dev dependencies
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../app')
let should = chai.should()
const assert = require('assert')

chai.use(chaiHttp)

const user = {
  name: 'nameTest',
  lastName: 'lastName',
  password: 'passwordTest',
  email: 'email@emailTest.com'
}

describe('User Registration', () => {
  beforeEach((done) => { // before each test we empty the databse
    User.deleteOne({
      email: user.email
    }, (err) => {
      done(err)
    })
  })

  it('POSITIVE - It should save a new user', (done) => {

    User.register(user).then((result, reject) => {
      if (reject) done(reject)
      result.should.be.a('object')
      result.should.have.property('token')
      result.should.have.property('name')
      result.should.have.property('lastName')
      result.should.have.property('_id')
      result.should.not.have.property('password')
      done()
    }).catch((err) => {
      done(err)
    })
  })

  it('NEGATIVE - Cannot register to user with same email', (done) => {
    User.register(user).then((result, reject) => {
      User.register(user).then((result, reject) => {
        if (result) done(result)
      }).catch((err) => {
        err.code.should.be.equal(11000)
        done()
      })
    })
  })

  it('POSITIVE - Find User By Email', (done) => {
    User.register(user).then((result, reject) => {
      User.findByEmail(user.email).then((result, reject) => {
        if (reject) done(reject)
        result.should.be.a('object')
        result.should.have.property('name')
        result.should.have.property('lastName')
        result.should.have.property('email')
        result.should.have.property('_id')
        result.should.not.have.property('password')
        done()
      }).catch((err) => {
        done(err)
      })
    })
  })

  it('NEGATIVE - Cannot find user By fake Email', (done) => {
    User.findByEmail('fakeEmail').then((result, reject) => {
      if (reject) done(reject)
      assert.equal(result, null)
      done()
    }).catch((err) => {
      done(err)
    })
  })

})