thunk = require './thunk'
map = require './map'

microasync =
  thunk: thunk
  map: map

module.exports = microasync
