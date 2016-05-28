fakeAjax = (time, callback) ->
  setTimeout callback, time, null, time

module.exports = fakeAjax
