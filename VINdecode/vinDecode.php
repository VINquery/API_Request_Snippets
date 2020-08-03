<?php

$response = file_get_contents('http://ws.vinquery.com/restxml.aspx?accesscode=YOUR_ACCESS_CODE&reportType=YOUR_REPORT_TYPE&vin=YOUR_VIN');
// YOUR_ACCESS_CODE: Your access code.
// YOUR_REPORT_TYPE: 0 - Basic, 1 - Standard, 2 - Extended, 3 - Lite
// YOUR_VIN: The vin you wish to decode.

// Parsing the response into a SimpleXMLElement
$response = new SimpleXMLElement($response);

// This prints the entire response without parsing.
// $string = $response -> asXML();
// echo($string);

// For each Item tag that inside a Vehicle tag, within a VIN tag, in $response, we will call $Item.
// We then print $Item's key and value.
foreach($response -> VIN -> Vehicle -> Item as $Item) {
    echo $Item['Key'], ': ', $Item['Value'], ' ';
}

?>
