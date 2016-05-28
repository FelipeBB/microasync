(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.microasync = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var map, microasync, thunk;

thunk = require('./thunk');

map = require('./map');

microasync = {
  thunk: thunk,
  map: map
};

module.exports = microasync;



},{"./map":2,"./thunk":3}],2:[function(require,module,exports){
var map, thunk;

thunk = require('./thunk');

map = function(arr, fn) {
  var cb, item, resolve, response, thunkArray;
  cb = null;
  response = [];
  resolve = function(err, value) {
    if (err && cb) {
      cb(err);
      return cb = null;
    }
    response.push(value);
    if (response.length === arr.length && cb) {
      return cb(null, response);
    }
  };
  thunkArray = (function() {
    var i, len, results;
    results = [];
    for (i = 0, len = arr.length; i < len; i++) {
      item = arr[i];
      results.push(thunk(fn, item)(resolve));
    }
    return results;
  })();
  return function(callback) {
    if (response.length === arr.length) {
      callback(null, response);
    }
    return cb = callback;
  };
};

module.exports = map;



},{"./thunk":3}],3:[function(require,module,exports){
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



},{}]},{},[1])(1)
});