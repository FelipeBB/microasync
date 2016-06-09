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

  it 'The order is important', (done) ->
    map([300, 200, 100], fakeAjax) (err, response) ->
      expect(response[0]) .to .be .equal 300
      expect(response[1]) .to .be .equal 200
      expect(response[2]) .to .be .equal 100
      done()
