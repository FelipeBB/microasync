thunk = require './thunk'
map = require './map'
filter = require './filter'
each = require './each'
parallel = require './parallel'

microasync =
  thunk: thunk
  map: map
  parallel: parallel
  filter: filter
  each: each

module.exports = microasync
