once = require './lib/once'

series = (functions, callback) ->
  callback = once callback

  execSeries = (fn, functions, acc, callback) ->
    fn (err, value) ->
      return callback err if err
      acc.push value
      return callback null, acc if not functions.length
      execSeries(functions[0], functions.slice(1), acc, callback)

  execSeries(functions[0], functions.slice(1), [], callback)

module.exports = series
