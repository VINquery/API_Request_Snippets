const url="http://ws.vinquery.com/restxml.aspx?accesscode=ACCESS_CODE&reportType=YOUR_REPORT_TYPE&vin=YOUR_VIN";
// YOUR_ACCESS_CODE: Your access code.
// YOUR_REPORT_TYPE: 0 - Basic, 1 - Standard, 2 - Extended, 3 - Lite
// YOUR_VIN: The vin you wish to decode.

// The third parameter in open() determines whether the request is opened synchronously or asynchronously.
// false - synchronous
// true - asynchronous
// Be sure to note that synchronous requests on the main thread have been deprecated and
// developers are recommended to use asynchronous requests instead due to negative impact on the
// user experience. 

// Get HTTP request, synchronous
function httpGetSync() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, false);
  xhttp.send();
  parser = new DOMParser();
  xmlDoc = parser.parseFromString(xhttp.responseText, "text/xml");
  // Parsing the response into a variable called text.
  var text = "Model Year: " + xmlDoc.getElementsByTagName("Item")[0].getAttribute("Value") + "\n";
  text += "Make: " + xmlDoc.getElementsByTagName("Item")[1].getAttribute("Value") + "\n";
  text += "Model: " + xmlDoc.getElementsByTagName("Item")[2].getAttribute("Value") + "\n";

  // Insert method of outputting the parsed response.

}

// Get HTTP request, asynchronously
function httpGetAsync() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, true);
  xhttp.send();

  // Once the response is ready:
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(xhttp.responseText, "text/xml");
      // Parsing the response into a variable called text.
      var text = "Model Year: " + xmlDoc.getElementsByTagName("Item")[0].getAttribute("Value") + "\n";
      text += "Make: " + xmlDoc.getElementsByTagName("Item")[1].getAttribute("Value") + "\n";
      text += "Model: " + xmlDoc.getElementsByTagName("Item")[2].getAttribute("Value") + "\n";
    }
  }

  // Insert method of outputting the parsed response.

}
