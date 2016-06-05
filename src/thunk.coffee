thunk = (fn, params...) ->
  response = undefined
  error = undefined
  cb = undefined

  fn params..., (err, value) ->
    return cb err if err and cb
    return cb null, value if cb
    response = value
    error = err

  return (callback) ->
    return callback error if error
    callback null, response if response
    cb = callback

module.exports = thunk
