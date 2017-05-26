var step = 0.01, values ={};

	var lanPol = function(x, x_values, y_values, size)
	{
		var lagrange_pol = 0;
		var basics_pol;

		for (var i = 0; i < size; i++)
		{
			basics_pol = 1;
			for (var j = 0; j < size; j++)
			{
				if (j == i) continue;
				basics_pol *= (x - x_values[j])/(x_values[i] - x_values[j]);
			}
			lagrange_pol += basics_pol*y_values[i];
		}
		return lagrange_pol;
	};
	
var getValues = function() {
		values = {}
		values.x = []
		values.y = []
		document.getElementById('x').value.split(' ').forEach(function(value){
			values.x.push(parseFloat(value));
		});
		document.getElementById('y').value.split(' ').forEach(function(value){
			values.y.push(parseFloat(value));
		});
		return values;
	};
	
(document.getElementById('start')).addEventListener('click', function(){

	var getDataArray = function(values){
		var dataArray = [['x', 'y']];
		var size = values.x.length;
		for (var x = values.x[0]; x < values.x[size-1]; x += step) {
			dataArray.push([x, lanPol(x, values.x, values.y, size)]);
		}
		return dataArray;
	}

	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback(drawChart);

	function drawChart() {
		var values = getValues(-10, 20, 1);
		var dataTable = getDataArray(values);
		var data = google.visualization.arrayToDataTable(dataTable);

		var options = {
			title: 'Lagrange polynomial',
			curveType: 'function',
			legend: { position: 'bottom' }
		};

		var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

		chart.draw(data, options);
	}
});

(document.getElementById('getY')).addEventListener('click', function(){
	var x = parseFloat(document.getElementById('xValue').value);
	var size = values.x.length;
	document.getElementById('yValue').value = lanPol(x, values.x, values.y, size);
});