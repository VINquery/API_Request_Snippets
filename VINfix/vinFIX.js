const url = "https://www.recognition.ws/vinfix/v1?accesscode=ACCESS_CODE&vin=YOUR_VIN";

// Synchronous Get HTTP Request
function httpGetSync() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(xhttp.responseText,"text/xml");
    var text;
    var algorithm1 = xmlDoc.getElementsByTagName("Algorithm1")[0].getElementsByTagName("Item");
    var algorithm2 = xmlDoc.getElementsByTagName("Algorithm2")[0].getElementsByTagName("Item");

    // As algorithm one and two can have varying amounts of suggestions, this accomodates for any scenario.
    
    text = "Algorithm 1:";
    for (var i = 0; i < algorithm1; i++) {
      text += "\n" + algorithm1[i].getAttribute("Key") + ": ";
      text += algorithm2[i].getAttribute("Value");
    }

    text += "\nAlgorithm 2:"

    for (var j = 0; j < algorithm2; j++) {
      text += "\n" + algorithm2[j].getAttribute("Key") + ": ";
      text += algorithm2[j].getAttribute("Value");
    }

    // Output text.

  }
  
  // Asynchronous Get HTTP Responsex
  function httpGetAsync() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();
    parser = new DOMParser();
    
    xhttp.onreadystatechange = function() {
      xmlDoc = parser.parseFromString(xhttp.responseText,"text/xml");
      var text;
      var algorithm1 = xmlDoc.getElementsByTagName("Item")[0].getElementsByTagName("Algorithm1");
      var algorithm2 = xmlDoc.getElementsByTagName("Item")[0].getElementsByTagName("Algorithm2");
    
      text = "Algorithm 1:";
      for (var i = 0; i < algorithm1; i++) {
        text += "\n" + algorithm1[i].getAttribute("Key") + ": ";
        text += algorithm2[i].getAttribute("Value");
      }

      text += "\nAlgorithm 2:"

      for (var j = 0; j < algorithm2; j++) {
        text += "\n" + algorithm2[j].getAttribute("Key") + ": ";
        text += algorithm2[j].getAttribute("Value");
      }
    }
  }