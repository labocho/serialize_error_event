require("babel-polyfill");

// List of error object properties (because Error object properies are not iteratable).
// Chrome uses: message, stack
// FireFox uses: fileName, lineNumber, message, stack
// Edge/IE uses: description, message, name, number, stack
// Safari uses: column, line, message, sourceURL, stack
// (but Safari's ErrorEvent object has no `error` property.)
const ERROR_OBJECT_PROPS = ["column", "columnNumber", "description", "fileName", "line", "lineNumber", "message", "name", "number", "sourceURL", "stack"];

// Array.isArray polyfill
if (Array.isArray) {
  const isArray = Array.isArray;
} else {
  function isArray (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  }
}

function SerializeErrorObject(e) {
  let serialized = {};
  serialized["constructor"] = e.constructor.toString();

  for (let prop of ERROR_OBJECT_PROPS) {
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
        let serialized_array = [];
        for (let element of obj) {
          serialized_array.push(SerializeObject(element));
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
  let serialized = {};

  for (let prop in e) {
    if (prop.match(/^[a-z]/)) {
      let value = e[prop];

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
