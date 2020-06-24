const url = "http://www.recognition.ws/vinfix/v1?accesscode=ACCESS_CODE&vin=YOUR_VIN";

function httpGetSync() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(xhttp.responseText,"text/xml");
    var text = "Algorithm 1: \n";
    var list = xmlDoc.getElementsByTagName("Item");
    var change = 0;
    var length = 0;

    for (var i = 0; i < list.length; i++) {
        if(change == 0) {
            if (list[i + 1].getAttribute("Key") == "Suggestion1") {
                text += list[i].getAttribute("Key") + ": ";
                text += list[i].getAttribute("Value") + "\n";
                text += "Algorithm 2: \n";
                change++;
            }
            else {
                text += list[i].getAttribute("Key") + ": ";
                text += list[i].getAttribute("Value") + "\n";
            }
        }
        else if (change == 1) {
            if (length < list.length) {
                text += list[i].getAttribute("Key") + ": ";
                text += list[i].getAttribute("Value") + "\n";
            }
        }
        length++;
    }
  }
  
  function httpGetAsync() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(xhttp.responseText,"text/xml");
        var text = "Algorithm 1: \n";
        var list = xmlDoc.getElementsByTagName("Item");
        var change = 0;
        var length = 0;

        for (var i = 0; i < list.length; i++) {
            if(change == 0) {
                if (list[i + 1].getAttribute("Key") == "Suggestion1") {
                  text += list[i].getAttribute("Key") + ": ";
                  text += list[i].getAttribute("Value") + "\n";
                  text += "Algorithm 2: \n";
                  change++;
              }
              else {
                text += list[i].getAttribute("Key") + ": ";
                text += list[i].getAttribute("Value") + "\n";
              }
            }
            else if (change == 1) {
              if (length < list.length) {               
                text += list[i].getAttribute("Key") + ": ";
                text += list[i].getAttribute("Value") + "\n";
            }
          }
          length++;
        }
      }
    }
  }