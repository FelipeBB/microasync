{expect} = require 'chai'
waterfall = require '../src/waterfall'
fakeAjax = require './helper/fakeAjax'


describe 'waterfall', ->
  it 'sanity', (done) ->
    waterfall [
      (callback) ->
        fakeAjax 200, (err, response) ->
          return callback err if  err
          callback null, response, response / 2
      (first, second, callback) ->
        fakeAjax second, (err, response) ->
          return callback err if  err
          callback null, response, response / 2
      (first, second, callback) ->
        fakeAjax second, (err, response) ->
          return callback err if  err
          callback null, response
    ], (err, response) ->
      expect(err) .to .be .equal null
      expect(response) .to .equal 50
      done()
