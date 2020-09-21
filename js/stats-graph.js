var audioElem = null;
var updateInterval = null;

var bufferedPartsCtx = null;
var bufferedPartsChart = null;
var bufferedPartsLabels = [];
var bufferedPartsValues = [];

function initializeGraphs () {
	initializeBufferedPartsChart();
	
	audioElem = document.getElementById('player');
	
	updateInterval = setInterval(function(e) {
		updateGraph();
	}, 2500);
}

function initializeBufferedPartsChart () {
	bufferedPartsCtx = document.getElementById('buffered-parts-chart').getContext('2d');
	bufferedPartsChart = new Chart(bufferedPartsCtx, {
		type: 'horizontalBar',
		data: {
			labels: ["Lengths"],
			datasets: []
		},
		options: {
			animation: {
				duration: 0
			},
			scales: {
				yAxes: [{
					stacked: true,
					ticks: {
						beginAtZero: true
					}
				}],
				xAxes: [{
					stacked: true,
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
	var segments = [];
	
	var currentStart;
	var currentEnd;
	
	for (var i = 0; i < values.length; i++) {
		currentStart = values.start(i);
		currentEnd = values.end(i);
		
		segments.push([currentStart, currentEnd]);
	}
	
	segments = convertSegments(segments);
	
	bufferedPartsChart.data.datasets = segments;
	bufferedPartsChart.update();
}

function sortSegments (segments) {
	segments.sort(function (seg1, seg2) {
		if (seg1[0] <= seg2[0]) {
			return -1;
		} else {
			return 1;
		}
	});
	return segments;
}

function convertSegments (segments) {
	segments = sortSegments(segments);
	
	var unbufferedCounter = 0;
	var isUnbuffered = [];
	var datasetLabels = [];
	var datasetLengths = [];
	
	var lastStart = 0;	
	var segment;
	var duration;
	
	
	for (var i = 0; i < segments.length; i++) {
		segment = segments[i];
		
		if (lastStart != segment[0]) {
			duration = segment[0] - lastStart;
			isUnbuffered.push(true);
			datasetLabels.push("Unbuffered #"+unbufferedCounter);
			datasetLengths.push(duration);
			unbufferedCounter++;
		}
		
		duration = segment[1] - segment[0];
		isUnbuffered.push(false);
		datasetLabels.push("Buffered #"+i);
		datasetLengths.push(duration);
		
		lastStart = segment[1];
	}
	
	return createDatasets(isUnbuffered, datasetLabels, datasetLengths);
}

function getCyclicColor (i) {
	var colors = [
		"red",
		"green",
		"blue",
		"yellow",
		"purple"
	];
	
	return colors[i % colors.length];
}

function createDatasets (isUnbuffered, datasetLabels, datasetLengths) {
	var datasets = [];
	var dataset;
	var color;
	
	
	for (var i = 0; i < isUnbuffered.length; i++) {
		if (isUnbuffered[i]) {
			color = "grey";
		} else {
			color = getCyclicColor(i);
		}
		
		
		dataset = {
			label: datasetLabels[i],
			data: [datasetLengths[i]],
			backgroundColor: color
		};
		datasets.push(dataset);
	}
	
	return datasets;
}

function addToGraph (i, currentStart, currentEnd) {
	bufferedPartsChart.data.labels.push(i);
	bufferedPartsChart.data.datasets[0].data.push(currentEnd - currentStart);
}

function rangeInBufferedParts (startValue, endValue) {
	var otherStart;
	var otherEnd;
	
	for (var i = 0; i < bufferedPartsValues.length; i++) {
		otherStart = bufferedPartsValues[i][0];
		otherEnd = bufferedPartsValues[i][1];
		
		if (otherStart == startValue && otherEnd == endValue) {
			return true;
		}
	}
	
	return false;
}

function updateBufferedPartsChart (bufferedAudio) {
	
}