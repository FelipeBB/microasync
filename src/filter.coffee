once = require './lib/once'
thunk = require './thunk'

filter = (arr, fn, callback) ->
  callback = once callback
  response = []
  resolveCounter = arr.length

  for item, index in arr
    do (item, index) ->
      thunk(fn, item) (err, value) ->
        callback err if err
        response[index] = item if value
        if not --resolveCounter
          response = response.filter (val) -> val
          callback null, response

module.exports = filter
