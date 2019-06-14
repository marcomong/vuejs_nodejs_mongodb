process.env.NODE_ENV = 'test'

const User = require('../models/User')

//require dev dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const should = chai.should()

chai.use(chaiHttp)

const user = {
  name: 'nameTest',
  lastName: 'lastName',
  password: 'passwordTest',
  email: 'email@emailTest1.com'
}

beforeEach((done) => { // before each test we empty the databse
  // console.log('clearing db...')
  User.deleteOne({
    email: user.email
  }, (err) => {
    done()
  })
})

describe('API User', () => {
  it('POSITIVE - /POST /user/register. It should save a new user', (done) => {
    chai.request(server)
      .post('/user/register')
      .send(user)
      .end((err, res) => {
        if (err) done(err)
        res.should.have.status(200)
        res.body.should.be.a('object')
        user.token = res.body.token
        done()
      })
  })

  it('POSITIVE - /POST /user/login. It should login a user', (done) => {
    const userLogin = {
      email: user.email,
      password: user.password
    }

    chai.request(server)
      .post('/user/register')
      .send(user)
      .end((err, res) => {
        if (err) done(err)
        chai.request(server)
          .post('/user/login')
          .send(userLogin)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('token')
            res.body.should.have.property('name')
            res.body.should.have.property('lastName')
            res.body.should.have.property('_id')
            done()
          })
      })
  })

})