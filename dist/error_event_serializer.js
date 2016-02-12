(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ErrorEventSerializer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

// List of error object properties (because Error object properies are not iteratable).
// Chrome uses: message, stack
// FireFox uses: fileName, lineNumber, message, stack
// Edge/IE uses: description, message, name, number, stack
// (Safari's ErrorEvent object has no `error` property.)
var ERROR_OBJECT_PROPS = ["columnNumber", "description", "fileName", "lineNumber", "message", "name", "stack"];

// Array.isArray polyfill
if (Array.isArray) {
  var isArray = Array.isArray;
} else {
  var isArray = function isArray(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

function SerializeErrorObject(e) {
  var serialized = {};
  serialized["constructor"] = e.constructor.toString();

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = ERROR_OBJECT_PROPS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var prop = _step.value;

      if (e.hasOwnProperty(prop)) {
        serialized[prop] = e[prop];
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return serialized;
}

function SerializeObject(obj) {
  var serialized;

  switch (typeof obj === "undefined" ? "undefined" : _typeof(obj)) {
    case "number":
    case "string":
    case "boolean":
      serialized = obj;
      break;
    case "object":
      if (Array.isArray(obj)) {
        var serialized_array = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = obj[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var element = _step2.value;

            serialized_array.push(SerializeObject(element));
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        serialized = serialized_array;
      } else if (obj === null) {
        serialized = null;
      } else if (obj.toString) {
        serialized = obj.toString();
      }
      break;
  }

  return serialized;
}

function SerializeErrorEvent(e) {
  var serialized = {};

  for (var prop in e) {
    if (prop.match(/^[a-z]/)) {
      var value = e[prop];

      // ignore function
      if (typeof value === "function") {
        continue;
      }

      if (prop === "error") {
        serialized[prop] = SerializeErrorObject(value);
      } else {
        serialized[prop] = SerializeObject(value);
      }
    }
  }

  return serialized;
}

module.exports = SerializeErrorEvent;

},{}]},{},[1])(1)
});