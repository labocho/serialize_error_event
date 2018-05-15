// List of error object properties (because Error object properies are not iteratable).
// Chrome uses: message, stack
// FireFox uses: fileName, lineNumber, message, stack
// Edge/IE uses: description, message, name, number, stack
// Safari uses: column, line, message, sourceURL, stack
// (but Safari's ErrorEvent object has no `error` property.)
var ERROR_OBJECT_PROPS = ["column", "columnNumber", "description", "fileName", "line", "lineNumber", "message", "name", "number", "sourceURL", "stack"];

// Array.isArray polyfill
if (Array.isArray) {
  var isArray = Array.isArray;
} else {
  function isArray (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  }
}

function SerializeErrorObject(e) {
  var serialized = {};
  serialized["constructor"] = e.constructor.toString();

  for (var i = 0; i < ERROR_OBJECT_PROPS.length; i++) {
    var prop = ERROR_OBJECT_PROPS[i];
    if (typeof e[prop] !== "undefined") {
      serialized[prop] = e[prop];
    }
  }

  return serialized;
}

function SerializeObject(obj) {
  var serialized;

  switch (typeof(obj)) {
    case "number":
    case "string":
    case "boolean":
      serialized = obj;
      break;
    case "object":
      if (Array.isArray(obj)) {
        var serialized_array = [];
        for (var i = 0; i < obj.length; i++) {
          serialized_array.push(SerializeObject(obj[i]));
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
      if (typeof(value) === "function") { continue; }

      if (prop === "error") {
        serialized[prop] = SerializeErrorObject(value);
      } else {
        serialized[prop] = SerializeObject(value);
      }
    }
  }

  return serialized;
}

module.exports = {
  serialize: SerializeErrorEvent,
  serializeError: SerializeErrorObject,
  serializeObject: SerializeObject,
};
