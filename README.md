# SerializeErrorEvent

Serializing ErrorEvent object for browsers.

# Example

    window.addEventListener("error", function(e) {
      var serialized = SerializeErrorEvent(e);
      console.log(serialized);
      console.log(JSON.stringify(serialized));
    }, false);
