## microasync

Tiny library (~ 5kb) designed to handle famous async problems, focusing on what
really matter.

_There is no reason to use a library with tons of different methods
when you usually will use only one or two of them._

## Installation

For nodejs projects

  `npm install --save microasync`

To use microasync in the browser [download](https://raw.githubusercontent.com/FelipeBB/microasync/master/dist/microasync.min.js)
the minified file inside the _dist_ folder.


## Documentation

<a name="each"></a>
### each(arr, function, [callback])

Iterate over array elements applying each element as a parameter of the specified function
in "parallel".

__Arguments__

* `arr` - Arary to iterate over.
* `function(el, callback)` - A function to apply to each item in `arr`.
* `callback(err, result)` - A callback which is called when all functions
  have finished, or an error occurs.

__Examples__


```js
var filesArr = ['file1', 'file2', 'file3'];
microasync.each(filesArr, function(file, callback) {
    //open the file and do something
    ...
}, function(err){
  // if any call produced an error, err != null
});
```
<a name="map"></a>

### map(arr, function, [callback])

Produces a new collection of values by mapping each element in `arr` through
the `function`.

__Arguments__

* `arr` - Array to iterate over.
* `function(el, callback)` - A function to apply to each item in `arr`.
* `callback(err, result)` - A callback which is called when all functions
  have finished, or an error occurs.

__Example__

```js
var filesArr = ['file1', 'file2', 'file3'];
microasync.map(filesArr, function(file, callback) {
  fileContent =  ... open file ...
  callback(null, fileContent);
}, function(err, response){
  //response should be an array with all file contents
});
```

<a name="filter"></a>

### filter(arr, function, [callback])

Returns a new array of all valid elements in `arr`.
The response in array will be in the same order as the original.

__Arguments__

* `arr` - Array to iterate over.
* `function(item, callback)` - A truth test to apply to each item in `arr`.
* `callback(err, result)` - A callback which is called when all functions
  have finished, or an error occurs.

__Example__

```js
var filesArr = ['file1', 'file2', 'file3'];
microasync.filter(filesArr, function(file, callback) {
    isFile = ...check if file exists ...
    callback(null, isFile);
}, function(err, response){
    // response is an array of the existing files
});
```

<a name="series"></a>

### series(tasks, [callback])

Run the functions in `tasks` in series, each one running once the previous
function has completed.

__Arguments__

* `tasks` - An array containing functions to run, each function is passed
  a `callback(err, result)` it must call on completion with an error `err` (which can
  be `null`) and an optional `result` value.
* `callback(err, response)` - Run once all the functions
  have completed. This function gets a response array containing all
  the result arguments passed to the `functions` callbacks.

__Example__

```js
microasync.series([
    function(callback){
        ...
        ..
        callback(null, 'foo');
    },
    function(callback){
        ...
        ..
        callback(null, 'bar');
    }
],
function(err, response){
    // response =['foo', 'bar']
});
```

<a name="parallel"></a>

### parallel(tasks, [callback])

Run the functions in `tasks` in "parallel", without waiting until the previous
function has completed.

__Arguments__

* `tasks` - An array containing functions to run.
* `callback(err, response)` - Is executed once all the functions
  have completed successfully.

__Example__

```js
microasync.parallel([
    function(callback){
        setTimeout(function(){
            callback(null, 'foo');
        }, 500);
    },
    function(callback){
        setTimeout(function(){
            callback(null, 'bar');
        }, 250);
    }
],
function(err, response){
    // response = ['foo','bar']
});
```

<a name="waterfall"></a>

### waterfall(tasks, [callback])

Run the functions in `tasks` in series, each passing their response to the next function in
the array.

__Arguments__

* `tasks` - An array of functions to run, each function is passed a
  `callback(err, result1, result2, ...)` it must call on completion.
* `callback(err, [response])` - An callback to run once all the functions
  have completed.



__Example__

```js
microasync.waterfall([
    function(callback) {
        callback(null, 10, 20);
    },
    function(arg1, arg2, callback) {
        var sum = arg1 + arg2; //30
        callback(null, sum);
    },
    function(arg1, callback) {
        var final = arg1 * 2; //60
        callback(null, final);
    }
],
function (err, response) {
    // response = 60
});
```
### More info
- Callbacks first argument must be an error (which can be `null`) and any
further arguments will be considerate as the resultant value.
- If a callback returns a error the final callback will be fired immediately.


## Notes
- microasync has nothing to do with [Async](https://github.com/caolan/async) project, it has a totally different implementation.

## License
MIT
