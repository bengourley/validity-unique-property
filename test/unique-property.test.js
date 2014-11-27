var createValidator = require('../')
  , assert = require('assert')

/* global describe, it */

describe('Unique property validator', function () {

  it('should callback with error message if findOne() returns an error', function (done) {
    var msg = 'findOne error'
      , validate = createValidator(function (query, cb) { return cb(new Error(msg)) })

    validate('username', 'user name', { username: 'jim' }, function (err) {
      assert.equal(err.message, msg)
      done()
    })
  })

  it('should provide an error message if findOne() returns a result', function (done) {
    var validate = createValidator(function (query, cb) {
      return cb(null, { _id: 'aaaa', username: 'jim' })
    })
    validate('username', 'user name', { username: 'jim' }, function (err, errMessage) {
      if (err) return done(err)
      assert.equal('"jim" already in use', errMessage)
      done()
    })
  })

  it('should not provide an error message if findOne() does not have a result', function (done) {
    var validate = createValidator(function (query, cb) {
      return cb(null)
    })
    validate('username', 'user name', { username: 'jim' }, function (err, errMessage) {
      if (err) return done(err)
      assert.equal(undefined, errMessage)
      done()
    })
  })

  it('should not provide an error message if findOne() returns a result that has the same id', function (done) {
    var validate = createValidator(function (query, cb) {
      return cb(null, { _id: 'aaaa', username: 'jim' })
    })
    validate('username', 'user name', { _id: 'aaaa', username: 'jim' }, function (err, errMessage) {
      if (err) return done(err)
      assert.equal(undefined, errMessage)
      done()
    })
  })

  it('should provide an error message if findOne() returns a result that has a different id', function (done) {
    var validate = createValidator(function (query, cb) {
      return cb(null, { _id: 'bbbb', username: 'jim' })
    })
    validate('username', 'user name', { _id: 'aaaa', username: 'jim' }, function (err, errMessage) {
      if (err) return done(err)
      assert.equal('"jim" already in use', errMessage)
      done()
    })
  })

  it('should allow a custom id property', function (done) {
    var validate = createValidator(function (query, cb) {
      return cb(null, { _ident: 'aaaa', username: 'jim' })
    }, { idProperty: '_ident' })
    validate('username', 'user name', { _ident: 'aaaa', username: 'jim' }, function (err, errMessage) {
      if (err) return done(err)
      assert.equal(undefined, errMessage)
      done()
    })
  })

  it('should not provide an error message if findOne() does not have a result for multi-properties', function (done) {
    var validate = createValidator(function (query, cb) {
      assert.deepEqual(query, { username: 'jim', email: 'test@test.com' })
      return cb(null)
    }, { keys: [ 'email' ] })
    validate('username', 'user name', { username: 'jim', email: 'test@test.com' }, function (err, errMessage) {
      if (err) return done(err)
      assert.equal(undefined, errMessage)
      done()
    })
  })

  it('should provide an error message if findOne() returns a result for multi-properties', function (done) {
    var validate = createValidator(function (query, cb) {
      assert.deepEqual(query, { username: 'jim', _ident: 'aaaa' })
      return cb(null, { _ident: 'aaaa', username: 'jim' })
    }, { idProperty: '_ident', keys: [ '_ident' ] })
    validate('username', 'user name', { _ident: 'aaaa', username: 'jim' }, function (err, errMessage) {
      if (err) return done(err)
      assert.equal(undefined, errMessage)
      done()
    })
  })

})
