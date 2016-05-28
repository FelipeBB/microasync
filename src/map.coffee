thunk = require './thunk'

map = (arr, fn) ->
  cb = null
  response = []

  resolve = (err, value) ->
    if err and cb
      cb err
      return cb = null

    response.push(value)
    if response.length is arr.length and cb
      cb null, response

  (thunk(fn, item)(resolve) for item in arr)

  return (callback) ->
    callback null, response if response.length is arr.length
    cb = callback

module.exports = map
