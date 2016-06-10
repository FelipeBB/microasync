once = require './lib/once'
thunk = require './thunk'

parallel = (functions, callback) ->
  callback = once callback
  response = []
  resolveCounter = functions.length

  (thunk(fn)(resolve) for fn in functions)

  resolve = (err, value) ->
    callback err if err
    response.push value
    callback null, response if not --resolveCounter

module.exports = parallel
