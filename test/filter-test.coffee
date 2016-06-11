{expect} = require 'chai'
filter = require '../src/filter'
fakeAjax = require './helper/fakeAjax'

greaterThan100 = (param, callback) ->
  fakeAjax param, (err, resp) ->
    callback err if err
    callback null, resp > 100

describe 'filter', ->
  it 'sanity', (done) ->
    filter [50, 150, 100], greaterThan100, (err, response) ->
      expect(err) .to .be .equal null
      expect(response) .to .not .be .empty
      expect(response / 1) .to .be .equal 150
      done()

  it 'The order is important', (done) ->
    filter [200, 90, 101], greaterThan100, (err, response) ->
      expect(response) .to .have . lengthOf 2
      expect(response[0]) .to .be .equal 200
      expect(response[1]) .to .be .equal 101
      done()
