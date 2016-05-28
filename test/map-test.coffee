{expect} = require 'chai'
map = require '../src/map'
fakeAjax = require './helper/fakeAjax'

describe 'map', ->
  it 'sanity', (done) ->
    map([100, 200, 300], fakeAjax) (err, response) ->
      expect(err) .to .be .equal null
      expect(response) .to .not .be .empty
      expect(response) .to .have .lengthOf 3
      done()
