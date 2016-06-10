thunk = require './thunk'
map = require './map'
parallel = require './parallel'

microasync =
  thunk: thunk
  map: map
  parallel: parallel

module.exports = microasync
