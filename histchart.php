<html>
	<head>		
		<link rel="stylesheet" href="css/bootstrap.min.css">
	  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
	  <script src="js/bootstrap.min.js"></script>
	  <script src="js/moment.js"></script>
	  <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
	  <script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
	  <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
	  <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
	  <script src="js/script.js"></script>
	</head>
	<body>	
	<!--
Developed by Nishant Kakar
-->	  
		<div id="chartContainer"></div>
		<script type="text/javascript" src="js/purl.js"></script>
		<script type="text/javascript" src="//code.highcharts.com/stock/highstock.js"></script>
		<script>
			var symbol="<?php echo $_REQUEST['symbol']?>";
			loadChart();
		</script>
	</body>
</html>