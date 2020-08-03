<?php

$response = file_get_contents('https://www.recognition.ws/vinfix/v1?accesscode=YOUR_ACCESS_CODE&vin=YOUR_VIN');
// YOUR_ACCESS_CODE: Your access code.
// YOUR_REPORT_TYPE: 0 - Basic, 1 - Standard, 2 - Extended, 3 - Lite
// YOUR_VIN: The vin you wish to decode.

// Parsing the response into a SimpleXMLElement
$response = new SimpleXMLElement($response);

// This can be used to output the entire response (non-parsed)
// $string = $response -> asXML();
// echo($string);

echo("Algorithm 1 \n");
// For each Item tag in Algorithm1 in $response, we will call $Item1 in this context.
// Then, echo $Item1's key and value.
// (Repeat for Algorithm 2)
foreach($response -> Algorithm1 -> Item as $Item1) {
    echo $Item1['Key'], ': ', $Item1['Value'];
}

echo("\n");

echo("Algorithm 2 \n");
foreach($response -> Algorithm2 -> Item as $Item2) {
    echo $Item1['Key'], ': ', $Item1['Value'];
}

?>
