{expect} = require 'chai'
once = require '../src/lib/once'

callbackTwice = (callback) ->
  callback = once callback
  callback 10
  callback 20

describe 'once', ->
  it 'sanity', ->
    result = 0
    callbackTwice (resp) ->
      result += resp

    expect(result / 1) .to .be .equal 10
