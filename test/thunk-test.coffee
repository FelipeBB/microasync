{expect} = require 'chai'
thunk = require '../src/thunk'
fakeAjax = require './helper/fakeAjax'

describe 'thunk', ->
  it 'sanity', ->
    ajax100 = thunk(fakeAjax, 100)
    ajax200 = thunk(fakeAjax, 200)
    ajax300 = thunk(fakeAjax, 300)

    ajax100 (err, resp) ->
      expect resp .to .be .equal 100
      ajax300 (err, resp) ->
        expect resp .to .be .equal 300
        ajax200 (err, resp) ->
          expect resp .to .be .equal 200
