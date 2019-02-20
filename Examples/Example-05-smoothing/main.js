//The base code was taken from the Smoothing example on Paperjs.org
//The original code was changed by Snezhana 
var width, height, center;
var points = 20;
var smooth = true;
var path = new Path();
var mousePos = view.center / 2;
var pathHeight = mousePos.y;
//In the following code the path is filled with gradient
path.fillColor = {
	gradient: {
		stops: [['white', 0.3],['black',0.3] ]
	}, 
	origin: [0,0],
	destination: [0,1080]
}
initializePath();

function initializePath() {
	center = view.center;
	width = view.size.width;
	height = view.size.height / 2;
	path.segments = [];
	path.add(view.bounds.bottomLeft);
	for (var i = 1; i < points; i++) {
		var point = new Point(width / points * i, center.y);
		path.add(point);
	}
	path.add(view.bounds.bottomRight);
	path.fullySelected = true;
}

function onFrame(event) {
	pathHeight += (center.y - mousePos.y - pathHeight) / 10;
	for (var i = 1; i < points; i++) {
		var sinSeed = event.count + (i + i % 10) * 100;
		var sinHeight = Math.sin(sinSeed / 200) * pathHeight;
		var yPos = Math.sin(sinSeed / 100) * sinHeight + height;
		path.segments[i].point.y = yPos;
	}
	if (smooth)
		path.smooth({ type: 'continuous' });
}

function onMouseMove(event) {
	mousePos = event.point;
}

function onMouseDown(event) {
	smooth = !smooth;
	if (!smooth) {
		// If smooth has been turned off, we need to reset
		// the handles of the path:
		for (var i = 0, l = path.segments.length; i < l; i++) {
			var segment = path.segments[i];
			segment.handleIn = segment.handleOut = null;
		}
	}
	//when mouse is clicked and held we want the 'mountains' to 
	//change color 
	path.fillColor = {
		gradient: {
			stops: [['#de6262', 0.3],['#ffb88c',0.5] ]
		}, 
		origin: [0,0],
		destination: [0,1080]
	}
}

//I added the following Event in order to change the color
//fill of the path, back to original
function onMouseUp(event){
	path.fillColor = {
		gradient: {
			stops: [['white', 0.3],['black',0.3] ]
		}, 
		origin: [0,0],
		destination: [0,1080]
	}
}

// Reposition the path whenever the window is resized:
function onResize(event) {
	initializePath();
}
