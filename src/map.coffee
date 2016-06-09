once = require './lib/once'
thunk = require './thunk'

map = (arr, fn) ->
  cb = null
  response = []
  resolveCounter = arr.length

  for item, index in arr
    do (index) ->
      thunk(fn, item) (err, value) ->
        cb err if err and cb
        response[index] = value
        cb null, response if not --resolveCounter and cb


  return (callback) ->
    callback = once callback
    callback null, response if response.length is arr.length
    cb = callback

module.exports = map
