once = require './lib/once'
thunk = require './thunk'

map = (arr, fn, callback) ->
  callback = once callback
  response = []
  resolveCounter = arr.length

  for item, index in arr
    do (index) ->
      thunk(fn, item) (err, value) ->
        callback err if err
        response[index] = value
        callback null, response if not --resolveCounter

module.exports = map
