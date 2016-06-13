thunk = require './thunk'

each = (arr, fn, callback) ->
  for item in arr
    setTimeout (item) -> #force exec async
      thunk(fn, item) (err, response) ->
        callback err if err
        callback null, response
      , 0

module.exports = each
