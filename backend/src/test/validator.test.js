const assert = require('assert')
const expect = require('chai').expect
const should = require('chai').should()

const validateUser = require('../validate/validateUser')

const user = {
  name: 'nameTest',
  lastName: 'lastName',
  password: 'passwordTest',
  email: 'email@emailTest.com'
}


describe('Validate User', function () {
  it('POSITIVE - Validates login/register body format', function () {
    validateUser.validate(user).should.be.equal(-1)
  })

  it('NEGATIVE - Validates wrong password', function () {
    user.password = 'sd'
    validateUser.validate(user).should.be.equal(3)
  })

  it('NEGATIVE - Validates wrong last Name', function () {
    user.lastName = null
    validateUser.validate(user).should.be.equal(2)
  })

  it('NEGATIVE - Validates wrong name', function () {
    user.name = null
    validateUser.validate(user).should.be.equal(1)
  })

  it('NEGATIVE - Validates wrong email', function () {
    user.email = null
    validateUser.validate(user).should.be.equal(0)
  })
})

// beforeEach('Setting up the userList', function(){
//   console.log('beforeEach')
//   // loginController.loadUserList(['abc123','xyz321'])
// })


// describe.skip('Basic Mocha String Test', function () {
//   it.skip('should return number of charachters in a string', function () {
//       assert.equal("Hello".length, 5)
//   })
//   it('should return first charachter of the string', function () {
//       assert.equal("Hello".charAt(0), 'H')
//   })
//   it('should return first charachter of the string', function () {
//     let test = true
//     // assert.equal(test, true)
//     test.should.equal(true)
//   })
// })

// describe('Basic Mocha String Test', function () {
//   it.only('should return number of charachters in a string', function () {
//       assert.equal("Hello".length, 5)
//   })
//   it('should return first charachter of the string', function () {
//       assert.equal("Hello".charAt(0), 'H')
//   })
//   it('should return first charachter of the string', function () {
//     let test = true
//     // assert.equal(test, true)
//     test.should.equal(true)
//   })
// })


//  afterEach('Setting up the userList', function(){
//   console.log('afterEach')
//   // loginController.loadUserList(['abc123','xyz321'])
// })