{expect} = require 'chai'
series = require '../src/series'
fakeAjax = require './helper/fakeAjax'

#warning: it's not a trustworthy test
describe 'series', ->
  it 'dummy', (done) ->
    series [
      (callback) ->
        fakeAjax(100, callback)
      (callback) ->
        fakeAjax(150, callback)
      (callback) ->
        fakeAjax(200, callback)
    ], (err, response) ->
      expect(err) .to .be .equal null
      expect(response) .to .have .lengthOf 3
      done()
