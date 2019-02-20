var voronoi =  new Voronoi();
var sites = generateBeeHivePoints(view.size / 60, true); //size of each cell
var bbox, diagram;
var oldSize = view.size;
var spotColor = new Color('rgb(2,30,2, 0.7)'); //color of cell
var mousePos = view.center;
var selected = false;
//Variables for random color (hex)
var letters = "0123456789ABCDEF"; //trying to apply the animation to randomly change color on click
//Resets color to # on click (hex)
var color = "#";

onResize();


function onMouseDown(event) {
	sites.push(event.point);
	renderDiagram();
}//event - listens when user has mouse over element 

function onMouseMove(event) {
	mousePos = event.point;
	if (event.count == 0)
		sites.push(event.point);
	sites[sites.length - 1] = event.point;
	renderDiagram();
}//event - when user moves mouse within a cell/div

function renderDiagram() {
	project.activeLayer.children = [];
	var diagram = voronoi.compute(sites, bbox);
	if (diagram) {
		for (var i = 0, l = sites.length; i < l; i++) {
			var cell = diagram.cells[sites[i].voronoiId];
			if (cell) {
				var halfedges = cell.halfedges,
					length = halfedges.length;
				if (length > 2) {
					var points = [];
					for (var j = 0; j < length; j++) {
						v = halfedges[j].getEndpoint();
						points.push(new Point(v));
					}
					createPath(points, sites[i]);
				}
			}
		}
	}
}// creates the cells on the html page

function removeSmallBits(path) {
	var averageLength = path.length / path.segments.length;
	var min = path.length / 50;
	for(var i = path.segments.length - 1; i >= 0; i--) {
		var segment = path.segments[i];
		var cur = segment.point;
		var nextSegment = segment.next;
		var next = nextSegment.point + nextSegment.handleIn;
		if (cur.getDistance(next) < min) {
			segment.remove();
		}
	}
}

function generateBeeHivePoints(size, loose) {
	var points = [];
	var col = view.size / size;
	for(var i = -1; i < size.width + 1; i++) {
		for(var j = -1; j < size.height + 1; j++) {
			var point = new Point(i, j) / new Point(size) * view.size + col / 3;
			if(j % 2)
				point += new Point(col.width / 2, 0);
			if(loose)
				point += (col / 2) * Point.random() - col / 4; //how to edit columns (make them look randomized)
			points.push(point);
		}
	}
	return points;
}
function createPath(points, center) {
	var path = new Path(); //fill base color instead of using spotColor
	if (!selected) {
		// path.fillColor = spotColor; 
		path.fillColor = {hue: Math.random() * 360, saturation: 1, brightness: 1};
		for(var i = 0; i < 6; i++) {
			color+= letters[Math.floor(Math.random()*16)]
		};
	
	} else {
		path.fullySelected = selected;
	}
	path.closed = true;

	for (var i = 0, l = points.length; i < l; i++) {
		var point = points[i];
		var next = points[(i + 1) == points.length ? 0 : i + 1];
		var vector = (next - point) / 2;
		path.add({
			point: point + vector,
			handleIn: -vector,
			handleOut: vector
		});
	}
	path.scale(0.95);  
	removeSmallBits(path);
	return path;
}//changes the width between cells

function onResize() {
	var margin = 20;
	bbox = {
		xl: margin,
		xr: view.bounds.width - margin,
		yt: margin,
		yb: view.bounds.height - margin
	};
	for (var i = 0, l = sites.length; i < l; i++) {
		sites[i] = sites[i] * view.size / oldSize;
	}
	oldSize = view.size;
	renderDiagram();
}

function onKeyDown(event) {
	if (event.key == 'space') {
		selected = !selected;
		renderDiagram();
	}
}

// function onFrame(event){
// path.fillColor.hue += 1;
// }