# SerializeErrorEvent

Serializing ErrorEvent object for browsers.

# Example

    // import SerializeErrorEvent from "serialize_error_event";
    //   Or
    // var SerializeErrorEvent = require("serialize_error_event");
    //   Or
    // <script src="dist/serialize_error_event.js"></script>

    window.addEventListener("error", function(e) {
      var serialized = SerializeErrorEvent(e);
      console.log(serialized);
      console.log(JSON.stringify(serialized));
    }, false);
