{expect} = require 'chai'
parallel = require '../src/parallel'
fakeAjax = require './helper/fakeAjax'


describe 'parallel', ->
  it 'sanity', ->
    parallel [
      (callback) ->
        fakeAjax(50, callback)
      (callback) ->
        fakeAjax(100, callback)
      (callback) ->
        fakeAjax(150, callback)
    ], (err, response) ->
      expect(err) .to .be .equal null
      expect(response) .to .have .lengthOf 3
