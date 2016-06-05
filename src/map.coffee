once = require './lib/once'
thunk = require './thunk'

map = (arr, fn) ->
  cb = null
  response = []

  resolve = (err, value) ->
    cb err if err and cb

    response.push(value)
    if response.length is arr.length and cb
      cb null, response

  (thunk(fn, item)(resolve) for item in arr)

  return (callback) ->
    callback = once callback
    callback null, response if response.length is arr.length
    cb = callback

module.exports = map
