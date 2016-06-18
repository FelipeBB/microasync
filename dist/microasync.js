(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.microasync = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var each, once, thunk;

once = require('./lib/once');

thunk = require('./thunk');

each = function(arr, fn, callback) {
  var i, item, len, resolveCounter, results;
  callback = once(callback);
  resolveCounter = arr.length;
  results = [];
  for (i = 0, len = arr.length; i < len; i++) {
    item = arr[i];
    results.push(setTimeout(function(item) {
      return thunk(fn, item)(function(err) {
        if (err) {
          callback(err);
        }
        if (!--resolveCounter) {
          return callback(null);
        }
      }, 0);
    }));
  }
  return results;
};

module.exports = each;



},{"./lib/once":3,"./thunk":8}],2:[function(require,module,exports){
var filter, once, thunk;

once = require('./lib/once');

thunk = require('./thunk');

filter = function(arr, fn, callback) {
  var i, index, item, len, resolveCounter, response, results;
  callback = once(callback);
  response = [];
  resolveCounter = arr.length;
  results = [];
  for (index = i = 0, len = arr.length; i < len; index = ++i) {
    item = arr[index];
    results.push((function(item, index) {
      return thunk(fn, item)(function(err, value) {
        if (err) {
          callback(err);
        }
        if (value) {
          response[index] = item;
        }
        if (!--resolveCounter) {
          response = response.filter(function(val) {
            return val;
          });
          return callback(null, response);
        }
      });
    })(item, index));
  }
  return results;
};

module.exports = filter;



},{"./lib/once":3,"./thunk":8}],3:[function(require,module,exports){
var once,
  slice = [].slice;

once = function(fn) {
  return function() {
    var auxFn, params;
    params = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    if (!fn) {
      return null;
    }
    auxFn = fn;
    fn = null;
    return auxFn.apply(null, params);
  };
};

module.exports = once;



},{}],4:[function(require,module,exports){
var each, filter, map, microasync, parallel, series, thunk, waterfall;

thunk = require('./thunk');

map = require('./map');

filter = require('./filter');

each = require('./each');

parallel = require('./parallel');

series = require('./series');

waterfall = require('./waterfall');

microasync = {
  thunk: thunk,
  map: map,
  parallel: parallel,
  filter: filter,
  each: each,
  series: series,
  waterfall: waterfall
};

module.exports = microasync;



},{"./each":1,"./filter":2,"./map":5,"./parallel":6,"./series":7,"./thunk":8,"./waterfall":9}],5:[function(require,module,exports){
var map, once, thunk;

once = require('./lib/once');

thunk = require('./thunk');

map = function(arr, fn, callback) {
  var i, index, item, len, resolveCounter, response, results;
  callback = once(callback);
  response = [];
  resolveCounter = arr.length;
  results = [];
  for (index = i = 0, len = arr.length; i < len; index = ++i) {
    item = arr[index];
    results.push((function(index) {
      return thunk(fn, item)(function(err, value) {
        if (err) {
          callback(err);
        }
        response[index] = value;
        if (!--resolveCounter) {
          return callback(null, response);
        }
      });
    })(index));
  }
  return results;
};

module.exports = map;



},{"./lib/once":3,"./thunk":8}],6:[function(require,module,exports){
var once, parallel, thunk;

once = require('./lib/once');

thunk = require('./thunk');

parallel = function(functions, callback) {
  var fn, i, len, resolve, resolveCounter, response;
  callback = once(callback);
  response = [];
  resolveCounter = functions.length;
  for (i = 0, len = functions.length; i < len; i++) {
    fn = functions[i];
    thunk(fn)(resolve);
  }
  return resolve = function(err, value) {
    if (err) {
      callback(err);
    }
    response.push(value);
    if (!--resolveCounter) {
      return callback(null, response);
    }
  };
};

module.exports = parallel;



},{"./lib/once":3,"./thunk":8}],7:[function(require,module,exports){
var once, series;

once = require('./lib/once');

series = function(functions, callback) {
  var execSeries;
  callback = once(callback);
  execSeries = function(fn, functions, acc, callback) {
    return fn(function(err, value) {
      if (err) {
        return callback(err);
      }
      acc.push(value);
      if (!functions.length) {
        return callback(null, acc);
      }
      return execSeries(functions[0], functions.slice(1), acc, callback);
    });
  };
  return execSeries(functions[0], functions.slice(1), [], callback);
};

module.exports = series;



},{"./lib/once":3}],8:[function(require,module,exports){
var thunk,
  slice = [].slice;

thunk = function() {
  var cb, error, fn, params, resolved, response;
  fn = arguments[0], params = 2 <= arguments.length ? slice.call(arguments, 1) : [];
  resolved = false;
  response = void 0;
  error = void 0;
  cb = void 0;
  fn.apply(null, slice.call(params).concat([function(err, value) {
    if (err && cb) {
      return cb(err);
    }
    if (cb) {
      return cb(null, value);
    }
    response = value;
    error = err;
    return resolved = true;
  }]));
  return function(callback) {
    if (error) {
      return callback(error);
    }
    if (resolved) {
      callback(null, response);
    }
    return cb = callback;
  };
};

module.exports = thunk;



},{}],9:[function(require,module,exports){
var once, waterfall,
  slice = [].slice;

once = require('./lib/once');

waterfall = function(functions, callback) {
  var waterfallRec;
  callback = once(callback);
  waterfallRec = function() {
    var fn, functions, params, resolve;
    fn = arguments[0], functions = arguments[1], params = 3 <= arguments.length ? slice.call(arguments, 2) : [];
    params = params || [];
    resolve = function() {
      var err, response;
      err = arguments[0], response = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      if (err) {
        return callback(err);
      }
      if (!functions.length) {
        return callback.apply(null, [null].concat(slice.call(response)));
      }
      return waterfallRec.apply(null, [functions[0], functions.slice(1)].concat(slice.call(response)));
    };
    params.push(resolve);
    return fn.apply(null, params);
  };
  return waterfallRec(functions[0], functions.slice(1));
};

module.exports = waterfall;



},{"./lib/once":3}]},{},[4])(4)
});