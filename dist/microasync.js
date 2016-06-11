(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.microasync = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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



},{"./lib/once":2,"./thunk":6}],2:[function(require,module,exports){
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



},{}],3:[function(require,module,exports){
var filter, map, microasync, parallel, thunk;

thunk = require('./thunk');

map = require('./map');

filter = require('./filter');

parallel = require('./parallel');

microasync = {
  thunk: thunk,
  map: map,
  parallel: parallel,
  filter: filter
};

module.exports = microasync;



},{"./filter":1,"./map":4,"./parallel":5,"./thunk":6}],4:[function(require,module,exports){
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



},{"./lib/once":2,"./thunk":6}],5:[function(require,module,exports){
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



},{"./lib/once":2,"./thunk":6}],6:[function(require,module,exports){
var thunk,
  slice = [].slice;

thunk = function() {
  var cb, error, fn, params, response;
  fn = arguments[0], params = 2 <= arguments.length ? slice.call(arguments, 1) : [];
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
    return error = err;
  }]));
  return function(callback) {
    if (error) {
      return callback(error);
    }
    if (response) {
      callback(null, response);
    }
    return cb = callback;
  };
};

module.exports = thunk;



},{}]},{},[3])(3)
});