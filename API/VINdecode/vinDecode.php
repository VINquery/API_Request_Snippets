<?php

$response = file_get_contents('http://ws.vinquery.com/restxml.aspx?accesscode=YOUR_ACCESS_CODE&reportType=YOUR_REPORT_TYPE&vin=YOUR_VIN');
$response = new SimpleXMLElement($response);
$string = $response -> asXML();

echo($string);

foreach($response -> VIN -> Vehicle -> Item as $Item) {
    echo $Item['Key'], ': ', $Item['Value'], ' ';
}

?>