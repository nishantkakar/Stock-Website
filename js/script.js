window.fbAsyncInit = function() {
	FB.init({
	  appId      : '633807403433019',
	  xfbml      : true,
	  version    : 'v2.5'
	});
	};

	(function(d, s, id){
		 var js, fjs = d.getElementsByTagName(s)[0];
		 if (d.getElementById(id)) {return;}
		 js = d.createElement(s); js.id = id;
		 js.src = "//connect.facebook.net/en_US/sdk.js";
		 fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
	
		var symbol="";
	var symbols;
	var nextEnabled=false;
	function symbolExists(symb) {
		if (!(localStorage.getItem("symbols") == null || localStorage.getItem("symbols")=="")) {
			symbols=localStorage.getItem("symbols").split(",");
		if($.inArray(symb,symbols)>=0)
			return true;
		else
			return false;
		}
		else
			return false;
	}
	
	function storeCurrentSymbol() {
		if(symbolExists(symbol))
		{
			deleteSymbol(symbol);
			document.getElementById("starimg").src="images/star.png";	
		}
		else {
			if (localStorage.getItem("symbols") === null || localStorage.getItem("symbols")=="") { 
				localStorage.setItem("symbols", symbol);
				this.src="images/coloredstar.png";
			}
			else {
				if(symbolExists(symbol)==false)
					localStorage.setItem("symbols", localStorage.getItem("symbols")+","+symbol);
			}
			document.getElementById("starimg").src="images/coloredstar.png";
		}
		loadSymbols();
		
		return false;
	}
	
	function deleteSymbol(symb) {
		symbols=localStorage.getItem("symbols").split(",");
		var index = symbols.indexOf(symb);
		if (index >= 0) {
			symbols.splice( index, 1 );
		}		
		localStorage.setItem("symbols", symbols.toString());
		$("#Row"+symb).css("display", "none");
	}
	
	function updateValues() {
		if (!(localStorage.getItem("symbols") === null || localStorage.getItem("symbols")=="")) { 
			for(var i=0;i<symbols.length;i++){
				var data_file="nkapi.php?type=stock&symbol="+document.getElementById("favorites").children[i+1].children[0].children[0].innerHTML;
					$.getJSON( data_file, function( json ) {
				document.getElementById("LP"+json.Symbol).innerHTML="$ "+json.LastPrice;
				var txt="";
				console.log(json.Symbol);
				if(json.ChangePercent>0)
				{
					txt+="<span style='color:green;'>"+(Math.round(json.Change*100)/100).toFixed(2)+" ( "+(Math.round(json.ChangePercent*100)/100).toFixed(2)+"% )";
					txt+=" <img src='http://cs-server.usc.edu:45678/hw/hw8/images/up.png' /></span>";
				}
				else if(json.ChangePercent<0)
				{
					txt+="<span style='color:red;'>"+(Math.round(json.Change*100)/100).toFixed(2)+" ( "+(Math.round(json.ChangePercent*100)/100).toFixed(2)+"% )";
					txt+=" <img src='http://cs-server.usc.edu:45678/hw/hw8/images/down.png' /></span>";
				}
				else
					txt+="<span>"+(Math.round(json.Change*100)/100).toFixed(2)+" ( "+(Math.round(json.ChangePercent*100)/100).toFixed(2)+"% )</span>";
				document.getElementById("change"+json.Symbol).innerHTML=txt;
					});
			}
		}
	}
	
	function loadSymbols() {
		document.getElementById("favorites").innerHTML='<tr><td style="font-weight: bold;">Symbol</td><td style="font-weight: bold;">Company Name</td><td style="font-weight: bold;">Stock Price</td><td style="font-weight: bold;">Change (Change Percent)</td><td style="font-weight: bold;">Market Cap</td><td style="font-weight: bold;"></td></tr>';
		if (!(localStorage.getItem("symbols") === null || localStorage.getItem("symbols")=="")) { 
			symbols=localStorage.getItem("symbols").split(",");
			for(i=0;i<symbols.length;i++){
				var data_file="nkapi.php?type=stock&symbol="+symbols[i];
				document.getElementById("favorites").innerHTML+="<tr id=\"Row"+symbols[i]+"\" style=\"display:none;\"><td><a href='' onclick='return loadJSON(\""+symbols[i]+"\")' >"+symbols[i]+"</a></td><td id=\"Name"+symbols[i]+"\"></td><td id=\"LP"+symbols[i]+"\">$ </td><td id=\"change"+symbols[i]+"\"></td><td id=\"MarketCap"+symbols[i]+"\"></td><td><button class='btn btn-default' onclick='deleteSymbol(\""+symbols[i]+"\");'> <span class='glyphicon glyphicon-trash'></span></button></td></tr>";
				$.getJSON( data_file, function( json ) {				
				document.getElementById("Name"+json.Symbol).innerHTML=json.Name;
				document.getElementById("LP"+json.Symbol).innerHTML="$ "+json.LastPrice;
				var txt="";
				if(json.ChangePercent>0)
				{
					txt+="<span style='color:green;'>"+(Math.round(json.Change*100)/100).toFixed(2)+" ( "+(Math.round(json.ChangePercent*100)/100).toFixed(2)+"% )";
					txt+=" <img src='http://cs-server.usc.edu:45678/hw/hw8/images/up.png' /></span>";
				}
				else if(json.ChangePercent<0)
				{
					txt+="<span style='color:red;'>"+(Math.round(json.Change*100)/100).toFixed(2)+" ( "+(Math.round(json.ChangePercent*100)/100).toFixed(2)+"% )";
					txt+=" <img src='http://cs-server.usc.edu:45678/hw/hw8/images/down.png' /></span>";
				}
				else
					txt+="<span>"+(Math.round(json.Change*100)/100).toFixed(2)+" ( "+(Math.round(json.ChangePercent*100)/100).toFixed(2)+"% )</span>";
				document.getElementById("change"+json.Symbol).innerHTML=txt;
				if(json.MarketCap>=1000000000)
					document.getElementById("MarketCap"+json.Symbol).innerHTML=(Math.round(json.MarketCap/1000000000*100)/100).toFixed(2)+" Billion";
				else if(json.MarketCap>=1000000)
					document.getElementById("MarketCap"+json.Symbol).innerHTML=(Math.round(json.MarketCap/1000000*100)/100).toFixed(2)+" Million";
				else
					document.getElementById("MarketCap"+json.Symbol).innerHTML=(Math.round(json.MarketCap*100)/100).toFixed(2)+"";
				$("#Row"+json.Symbol).css("display", "table-row");
			 });
			}
		}
	}
	var jsonObj;
	var d;
	function loadJSON(symb){
		
		if(symb==0)
			symbol=document.getElementById("symbol").value;
		else
			symbol=symb;
		var data_file="nkapi.php?type=stock&symbol="+symbol;
		$.getJSON(data_file, function(json,status){
			if(status=="success"){
				if(json.Status=="SUCCESS") {
					jsonObj=json;
					var txt='<label style="text-align:left;margin: 5px 0 15px 10px;">Stock Details</label><br /><table class="table table-striped"><tbody><tr><th>Name</th>';
					txt+="<td>"+jsonObj.Name+"</td></tr>";
					symbol=jsonObj.Symbol;
					txt+="<tr><th>Symbol</th><td>"+jsonObj.Symbol+"</td></tr>";
					txt+="<tr><th>Last Price</th><td>$ "+jsonObj.LastPrice+"</td></tr>";
					if(jsonObj.ChangePercent>0)
					{
						txt+="<tr><th>Change (Change Percent)</th><td style='color:green;'>"+(Math.round(jsonObj.Change*100)/100).toFixed(2)+" ( "+(Math.round(jsonObj.ChangePercent*100)/100).toFixed(2)+"% )";
						txt+=" <img src='http://cs-server.usc.edu:45678/hw/hw8/images/up.png' />";
					}
					else if(jsonObj.ChangePercent<0)
					{
						txt+="<tr><th>Change (Change Percent)</th><td style='color:red;'>"+(Math.round(jsonObj.Change*100)/100).toFixed(2)+" ( "+(Math.round(jsonObj.ChangePercent*100)/100).toFixed(2)+"% )";
						txt+=" <img src='http://cs-server.usc.edu:45678/hw/hw8/images/down.png' />";
					}
					else
						txt+="<tr><th>Change (Change Percent)</th><td>"+(Math.round(jsonObj.Change*100)/100).toFixed(2)+" ( "+(Math.round(jsonObj.ChangePercent*100)/100).toFixed(2)+"% )";
					txt+="</td></tr>";
					txt+="<tr><th>Time and Date</th><td>"+moment(jsonObj.Timestamp).format('DD MMMM YYYY, hh:mm:ss a')+"</td></tr>";
					if(jsonObj.MarketCap>=1000000000)
						txt+="<tr><th>Market Cap</th><td>"+(Math.round(jsonObj.MarketCap/1000000000*100)/100).toFixed(2)+" Billion</td></tr>";
					else if(jsonObj.MarketCap>=1000000)
						txt+="<tr><th>Market Cap</th><td>"+(Math.round(jsonObj.MarketCap/1000000*100)/100).toFixed(2)+" Million</td></tr>";
					else
						txt+="<tr><th>Market Cap</th><td>"+(Math.round(jsonObj.MarketCap*100)/100).toFixed(2)+"</td></tr>";
					txt+="<tr><th>Volume</th><td>"+jsonObj.Volume+"</td></tr>";
					if(jsonObj.ChangePercentYTD>0)
					{
						txt+="<tr><th>Change YTD (Change Percent YTD)</th><td style='color:green;'>"+(Math.round(jsonObj.ChangeYTD*100)/100).toFixed(2)+" ( "+(Math.round(jsonObj.ChangePercentYTD*100)/100).toFixed(2)+"% )";
						txt+=" <img src='http://cs-server.usc.edu:45678/hw/hw8/images/up.png' />";
					}
					else if(jsonObj.ChangePercentYTD<0)
					{
						txt+="<tr><th>Change YTD (Change Percent YTD)</th><td style='color:red;'>"+(Math.round(jsonObj.ChangeYTD*100)/100).toFixed(2)+" ( "+(Math.round(jsonObj.ChangePercentYTD*100)/100).toFixed(2)+"% )";
						txt+=" <img src='http://cs-server.usc.edu:45678/hw/hw8/images/down.png' />";
					}
					else
						txt+="<tr><th>Change YTD (Change Percent YTD)</th><td>"+(Math.round(jsonObj.ChangeYTD*100)/100).toFixed(2)+" ( "+(Math.round(jsonObj.ChangePercentYTD*100)/100).toFixed(2)+"% )";
					txt+="</td></tr>";
					txt+="<tr><th>High Price</th><td>$ "+jsonObj.High+"</td></tr>";
					txt+="<tr><th>Low Price</th><td>$ "+jsonObj.Low+"</td></tr>";
					txt+="<tr><th>Opening Price</th><td>$ "+jsonObj.Open+"</td></tr>";
					txt+="</tbody></table>";
					document.getElementById("stockdetails").innerHTML=txt;
					if(symbolExists(symbol))
					{
						document.getElementById("starimg").src="images/coloredstar.png";
					}
					else
					{
						document.getElementById("starimg").src="images/star.png";
					}
					document.getElementById("errormsg").innerHTML="";
					$("#myCarousel").carousel(1);
					$("#myCarousel").carousel("pause");
					document.getElementById("yahooapi").innerHTML="<img style='width:100%;' src='http://chart.finance.yahoo.com/t?s="+symbol+"&lang=en-US&width=500&height=350' />"
					document.getElementById("nextButton").removeAttribute("disabled");
					loadChart();
					loadNews();
					nextEnabled=true;
				}
				else
				{
					document.getElementById("errormsg").innerHTML="Stock information not found for this symbol.";
				}
			}
			else
			document.getElementById("errormsg").innerHTML="An error occurred. Please try again";
        });
		
		return false;
	}
	
	function loadNews(){		
		var data_file="nkapi.php?type=news&symbol="+symbol;
		$.getJSON(data_file, function(jsonObj){
			var txt="";
			for(var i=0;i<jsonObj.d.results.length;i++)
			{
				txt+= "<div class='well'><a target='_blank' href='" +jsonObj.d.results[i].Url+ "'>"+ jsonObj.d.results[i].Title+"</a><br /><br /><p>"+jsonObj.d.results[i].Description.replace(symbol, "<b>"+symbol+"</b>")+"</p><label class='topspace'>Publisher: "+jsonObj.d.results[i].Source+"</label><br /><label class='topspace'>Date: "+moment(jsonObj.d.results[i].Date).format('DD MMM YYYY HH:mm:ss')+"</label></div>"
				document.getElementById("news").innerHTML=txt;
			}			
		});
		
		return false;
	}

	$(function() {

		$("#symbol")
			.focus()
			.autocomplete({
				source: function(request,response) {
					$.ajax({
						beforeSend: function(){ 
							$("span.help-inline").show();
							$("span.label-info").empty().hide();
						},
						url: "nkapi.php?type=search&symbol="+request.term,
						dataType: "json",
						
						success: function(data) {
							response( $.map(data, function(item) {
								return {
									label: item.Symbol + " - " +item.Name + " ( " +item.Exchange+ " )",
									value: item.Symbol
								}
							}));
							$("span.help-inline").hide();
						},
						error: function(data) {
							document.getElementById("errormsg").innerHTML="Select a valid entry.";
						}
					});
				},
				minLength: 0,
				select: function( event, ui ) {
					//console.log(ui.item);
					$("span.label-info").html("You selected " + ui.item.label).fadeIn("fast");
				},
				open: function() {
					//$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
				},
				close: function() {
					//$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
				}
			})
		;
	});
	
	function clearAll() {
		document.getElementById("symbol").value="";
		symbol="";
		nextEnable=false;
		document.getElementById("nextButton").setAttribute("disabled","true");
		$("#myCarousel").carousel(0);
		$("#myCarousel").carousel("pause");
	}
	
	function postFB() {
		FB.ui({
		  method: 'feed',
		  link: 'http://dev.markitondemand.com/',
		  name: 'Current Stock Price of '+jsonObj.Name+' is $'+jsonObj.LastPrice,
		  description: 'Stock information of '+jsonObj.Name+' ('+jsonObj.Symbol+')',
		  caption : 'LAST TRADE PRICE: $ '+jsonObj.LastPrice+', CHANGE: '+(Math.round(jsonObj.Change*100)/100).toFixed(2)+' ('+(Math.round(jsonObj.ChangePercent*100)/100).toFixed(2)+'%)',
		  picture: 'http://chart.finance.yahoo.com/t?s='+jsonObj.Symbol+'&lang=en-US&width=150&height=150',
		}, function(response){			
				if(response==null)
					alert("Not Posted");
				else
					alert("Posted Successfully");
		});
		return false;
	}
	var myVar;
	  $(function() {
		$('#autoupd').change(function() {
		  if($(this).prop('checked')==false)
		  {
			  clearInterval(myVar);
		  }
		  else {
			  myVar = setInterval(updateValues, 5000);
		  }
		})
	  })
	  
	  function loadChart() {
				$(function(){
				var sym = $.url().param('symbol') || symbol;
				var dur = $.url().param('duration') || 3650;
				
				new Markit.InteractiveChartApi(sym, dur);
			});				
			}
			
/** 
 * Version 2.0
 */
var Markit = {};
/**
 * Define the InteractiveChartApi.
 * First argument is symbol (string) for the quote. Examples: AAPL, MSFT, JNJ, GOOG.
 * Second argument is duration (int) for how many days of history to retrieve.
 */
Markit.InteractiveChartApi = function(symbol,duration){
    this.symbol = symbol.toUpperCase();
    this.duration = duration;
    this.PlotChart();
};

Markit.InteractiveChartApi.prototype.PlotChart = function(){
    
    var params = {
        parameters: JSON.stringify( this.getInputParams() )
    }

    //Make JSON request for timeseries data
    $.ajax({
        beforeSend:function(){
            $("#chartContainer").text("Loading chart...");
        },
        url: "nkapi.php?type=chart&symbol="+symbol,
        dataType: "json",
        context: this,
        success: function(json){
            //Catch errors
            if (!json || json.Message){
                console.error("Error: ", json.Message);
                return;
            }
			
            this.render(json);
        },
        error: function(response,txtStatus){
            console.log(response,txtStatus)
        }
    });
};

Markit.InteractiveChartApi.prototype.getInputParams = function(){
    return {  
        Normalized: false,
        NumberOfDays: this.duration,
        DataPeriod: "Day",
        Elements: [
            {
                Symbol: this.symbol,
                Type: "price",
                Params: ["ohlc"] //ohlc, c = close only
            },
            {
                Symbol: this.symbol,
                Type: "volume"
            }
        ]
        //,LabelPeriod: 'Week',
        //LabelInterval: 1
    }
};

Markit.InteractiveChartApi.prototype._fixDate = function(dateIn) {
    var dat = new Date(dateIn);
    return Date.UTC(dat.getFullYear(), dat.getMonth(), dat.getDate());
};

Markit.InteractiveChartApi.prototype._getOHLC = function(json) {
    var dates = json.Dates || [];
    var elements = json.Elements || [];
    var chartSeries = [];

    if (elements[0]){

        for (var i = 0, datLen = dates.length; i < datLen; i++) {
            var dat = this._fixDate( dates[i] );
            var pointData = [
                dat,
                elements[0].DataSeries['open'].values[i],
                elements[0].DataSeries['high'].values[i],
                elements[0].DataSeries['low'].values[i],
                elements[0].DataSeries['close'].values[i]
            ];
            chartSeries.push( pointData );
        };
    }
    return chartSeries;
};

Markit.InteractiveChartApi.prototype._getVolume = function(json) {
    var dates = json.Dates || [];
    var elements = json.Elements || [];
    var chartSeries = [];

    if (elements[1]){

        for (var i = 0, datLen = dates.length; i < datLen; i++) {
            var dat = this._fixDate( dates[i] );
            var pointData = [
                dat,
                elements[1].DataSeries['volume'].values[i]
            ];
            chartSeries.push( pointData );
        };
    }
    return chartSeries;
};

Markit.InteractiveChartApi.prototype.render = function(data) {
    //console.log(data)
    // split the data set into ohlc and volume
    var ohlc = this._getOHLC(data),
        volume = this._getVolume(data);

    // set the allowed units for data grouping
  

    // create the chart
    $('#chartContainer').highcharts('StockChart', {
        
        rangeSelector: {
            selected: 0,
			allButtonsEnabled: true,
			inputEnabled: false,
			buttons: [{
				type: 'week',
				count: 1,
				text: '1w'
			}, {
				type: 'month',
				count: 1,
				text: '1m'
			}, {
				type: 'month',
				count: 3,
				text: '3m'
			}, {
				type: 'month',
				count: 6,
				text: '6m'
			}, {
				type: 'ytd',
				text: 'YTD'
			}, {
				type: 'year',
				count: 1,
				text: '1y'
			}, {
				type: 'all',
				text: 'All'
			}]
            //enabled: false
        },

        title: {
            text: this.symbol + ' Stock Value'
        },
		
        yAxis: [{
            title: {
                text: 'Stock Value'
            }
        }],
		
		plotOptions: {
			area: {
				fillColor: {
					linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
					stops: [
						[0, '#9BC7F3'],
						[1, '#FFFFFF']
					]
				},
				tooltip: {
					pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>${point.y}</b><br/>'
				}
			}
		},
		
        series: [{
            type: 'area',
            name: this.symbol,
            data: ohlc,
            dataGrouping: {
                enabled: true,
                forced: true
            }
        }    
        ]
    });
};