var audioElem = null;
var updateInterval = null;

var bufferedPartsCtx = null;
var bufferedPartsChart = null;
var bufferedPartsLabelsSet = new Set();
var bufferedPartsLabels = [];
var bufferedPartsValues = [];

function initializeGraphs () {
	initializeBufferedPartsChart();
	
	audioElem = document.getElementById('player');
	
	updateInterval = setInterval(function(e) {
		updateGraph();
	}, 1000);
}

function initializeBufferedPartsChart () {
	bufferedPartsCtx = document.getElementById('buffered-parts-chart').getContext('2d');
	bufferedPartsChart = new Chart(bufferedPartsCtx, {
		type: 'line',
		data: {
			labels: ["Rot"],
			datasets: [{
				label: "Was",
				data: [1]
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});
}


function updateGraph () {
	var values = audioElem.buffered;
	var valStart = values.start(0);
	var valEnd = values.end(0);
	
	console.log(valStart, valEnd);
	
}

function updateBufferedPartsChart (bufferedAudio) {
	
}