<?php

$response = file_get_contents('http://www.recognition.ws/vinfix/v1?accesscode=7fdc7ba0-6a5c-4122-a74c-31f5de9ef87c&vin=VRXPA93414WA60473');
$response = new SimpleXMLElement($response);
$string = $response -> asXML();

echo($string);

echo("Algorithm 1 \n");
foreach($response -> Algorithm1 -> Item as $Item1) {
    echo $Item1['Key'], ': ', $Item1['Value'];
}

echo("\n");

echo("Algorithm 2 \n");
foreach($response -> Algorithm2 -> Item as $Item2) {
    echo $Item1['Key'], ': ', $Item1['Value'];
}

?>