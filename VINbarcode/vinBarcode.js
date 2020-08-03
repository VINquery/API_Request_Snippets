// The third parameter in open() determines whether the request is opened synchronously or asynchronously.
// false - synchronous
// true - asynchronous
// Be sure to note that synchronous requests on the main thread have been deprecated and
// developers are recommended to use asynchronous requests instead due to negative impact on the
// user experience. 

// Synchronous POST request
function httpPostSync() {
    const url = "http://www.recognition.ws/vinbarcode/v1?accesscode=ACCESS_CODE";
    // ACCESS_CODE: Your access code.

    var xhttp = new XMLHttpRequest();
    var parser = new DOMParser();
    var fileInput = document.getElementById('the-file');
    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append('file', file);
    xhttp.open("POST", url, false);
    xhttp.send(formData);
    
    xmlDoc = parser.parseFromString(xhttp.responseText, "text/xml");
    var text = "VIN Captured: " + xmlDoc.getElementsByTagName("VIN_Captured")[0].childNodes[0].nodeValue;
    // alert("Response: " + xhttp.responseText);
}

// Asynchronous POST request
function httpPostAsync() {
    const url = "http://www.recognition.ws/vinbarcode/v1?accesscode=ACCESS_CODE";
    // ACCESS_CODE: Your access code.

    var xhttp = new XMLHttpRequest();
    var fileInput = document.getElementById('the-file');
    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append('file', file);
    xhttp.open("POST", url, true);
    xhttp.send(formData);

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var parser = new DOMParser();
            xmlDoc = parser.parseFromString(xhttp.responseText, "text/xml");
            var text = "VIN Captured: " + xmlDoc.getElementsByTagName("VIN_Captured")[0].childNodes[0].nodeValue;
            // alert("Response: " + xhttp.responseText);
        }
    }
}
