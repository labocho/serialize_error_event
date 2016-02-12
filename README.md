# ErrorEventSerializer

Serializing ErrorEvent object for browsers.

# Example

    // import ErrorEventSerializer from "error_event_serializer";
    //   Or
    // var ErrorEventSerializer = require("error_event_serializer");
    //   Or
    // <script src="dist/error_event_serializer.js"></script>

    window.addEventListener("error", function(e) {
      var serialized = ErrorEventSerializer.serialize(e);
      console.log(serialized);
      console.log(JSON.stringify(serialized));
    }, false);
