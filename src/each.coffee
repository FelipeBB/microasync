once = require './lib/once'
thunk = require './thunk'

each = (arr, fn, callback) ->
  callback = once callback
  resolveCounter = arr.length
  for item in arr
    setTimeout (item) -> #force exec async
      thunk(fn, item) (err) ->
        callback err if err
        callback null if not --resolveCounter
      , 0

module.exports = each
