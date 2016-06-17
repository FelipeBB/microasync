{expect} = require 'chai'
each = require '../src/each'
fakeAjax = require './helper/fakeAjax'

describe 'each', ->
  it 'sanity', (done) ->
    list = [50, 100, 150]
    each list, fakeAjax, (err) ->
      expect(err) .to .be .null
      done()
