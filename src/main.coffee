thunk = require './thunk'
map = require './map'
filter = require './filter'
parallel = require './parallel'

microasync =
  thunk: thunk
  map: map
  parallel: parallel
  filter: filter

module.exports = microasync
