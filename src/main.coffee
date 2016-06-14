thunk = require './thunk'
map = require './map'
filter = require './filter'
each = require './each'
parallel = require './parallel'
series = require './series'

microasync =
  thunk: thunk
  map: map
  parallel: parallel
  filter: filter
  each: each
  series: series

module.exports = microasync
