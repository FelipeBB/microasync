once = (fn) ->
  return (params...) ->
    return null if not fn
    auxFn = fn
    fn = null
    auxFn params...

module.exports = once
