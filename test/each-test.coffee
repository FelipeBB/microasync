{expect} = require 'chai'
each = require '../src/each'
fakeAjax = require './helper/fakeAjax'

describe 'each', ->
  it 'sanity', (done) ->
    list = [50, 100, 150]
    cbCounter = 0
    each list, fakeAjax, (err, response) ->
      expect(err) .to .be .null
      expect(response) .to .not .be .null
      if ++cbCounter is list.length
        done()
