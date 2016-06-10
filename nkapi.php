<?php
$term=$_REQUEST['symbol'];
$type=$_REQUEST['type'];
if($type=="news") {
	$username = "";//Get your API key from Bing Search and enter it
	$password = "";//as both username and password
	$remote_url = 'https://api.datamarket.azure.com/Bing/Search/v1/News?Query=%27'.$term.'%27&$format=json';
//Developed by Nishant Kakar
	// Create a stream
	$opts = array(
	  'http'=>array(
		'method'=>"GET",
		'header' => "Authorization: Basic " . base64_encode("$username:$password")                 
	  )
	);

	$context = stream_context_create($opts);

	// Open the file using the HTTP headers set above
	$file = file_get_contents($remote_url, false, $context);
	echo $file;
}
elseif($type=="stock") {
	$url="http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=".$term;
	$json = file_get_contents($url);
	echo $json;
}
elseif($type=="chart") {
	$url="http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=%7b%22Normalized%22:false,%22NumberOfDays%22:1095,%22DataPeriod%22:%22Day%22,%22Elements%22:%5b%7b%22Symbol%22:%22".$term."%22,%22Type%22:%22price%22,%22Params%22:%5b%22ohlc%22%5d%7d%5d%7d";
	$json = file_get_contents($url);
	echo $json;
}
elseif($type=="search") {
	$url="http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input=".$term;
	$json = file_get_contents($url);
	echo $json;
}
?>