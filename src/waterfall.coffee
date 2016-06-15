once = require './lib/once'

waterfall = (functions, callback) ->
  callback = once callback
  waterfallRec = (fn, functions, params...) ->
    params = params or []
    resolve = (err, response...) ->
      return callback err if err
      return callback null, response... if not functions.length
      waterfallRec functions[0], functions.slice(1), response...

    params.push resolve
    fn params...

  waterfallRec functions[0], functions.slice(1)
module.exports = waterfall
