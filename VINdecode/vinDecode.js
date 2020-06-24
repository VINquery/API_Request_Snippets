const url="http://ws.vinquery.com/restxml.aspx?accesscode=ACCESS_CODE&reportType=YOUR_REPORT_TYPE&vin=YOUR_VIN";

function httpGetSync() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, false);
  xhttp.send();
  parser = new DOMParser();
  xmlDoc = parser.parseFromString(xhttp.responseText,"text/xml");
  var text = "Model Year: " + xmlDoc.getElementsByTagName("Item")[0].getAttribute("Value") + "\n";
  text += "Make: " + xmlDoc.getElementsByTagName("Item")[1].getAttribute("Value") + "\n";
  text += "Model: " + xmlDoc.getElementsByTagName("Item")[2].getAttribute("Value") + "\n";
}

function httpGetAsync() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(xhttp.responseText, "text/xml");
      var text = "Model Year: " + xmlDoc.getElementsByTagName("Item")[0].getAttribute("Value") + "\n";
      text += "Make: " + xmlDoc.getElementsByTagName("Item")[1].getAttribute("Value") + "\n";
      text += "Model: " + xmlDoc.getElementsByTagName("Item")[2].getAttribute("Value") + "\n";
    }
  }
}