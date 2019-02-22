
//Code from paper.js example "Meta Balls" (changed a bit by Lin)

// Ported from original Metaball script by SATO Hiroyuki
// http://park12.wakwak.com/~shp/lc/et/en_aics_script.html

project.currentStyle = {
	fillColor: 'gold' //color changed


	
	
};

//extra balls on tha canvas removed 
var ballPositions = [];


var handle_len_rate = 2.4;
var circlePaths = [];
var radius = 50;
for (var i = 0, l = ballPositions.length; i < l; i++) {
	var circlePath = new Path.Circle({
		center: ballPositions[i],
		radius: 50
	});
	circlePaths.push(circlePath);
}

var largeCircle = new Path.Circle({
	center: [600, 500],
	radius: 450
});

//DELETE THIS BEFORE HANDIN?
//Second circle that follows mouse added
//var largeCircle2 = new Path.Circle({
	//center: [676, 433],
	//radius: 50
	
//});

circlePaths.push(largeCircle);
//DELETE THIS BEFORE HAND IN
//circlePaths.push(largeCircle2);



//Code from exemple "future splash"
// Code ported to Paper.js from http://the389.com/9/1/
// with permission.

var values = {
	friction: 0.8,
	timeStep: 0.01,
	amount: 15,
	mass: 2,
	count: 0
};
values.invMass = 1 / values.mass;

var path, springs;
var size = view.size * [1.2, 1];

var Spring = function(a, b, strength, restLength) {
	this.a = a;
	this.b = b;
	this.restLength = restLength || 80;
	this.strength = strength ? strength : 0.55;
	this.mamb = values.invMass * values.invMass;
};

Spring.prototype.update = function() {
	var delta = this.b - this.a;
	var dist = delta.length;
	var normDistStrength = (dist - this.restLength) /
			(dist * this.mamb) * this.strength;
	delta.y *= normDistStrength * values.invMass * 0.2;
	if (!this.a.fixed)
		this.a.y += delta.y;
	if (!this.b.fixed)
		this.b.y -= delta.y;
};


function createPath(strength) {
	var path = new Path({
		fillColor: 'Aqua' //Color changed from black 
	});
	springs = [];
	for (var i = 0; i <= values.amount; i++) {
		var segment = path.add(new Point(i / values.amount, 0.5) * size);
		var point = segment.point;
		if (i == 0 || i == values.amount)
			point.y += size.height;
		point.px = point.x;
		point.py = point.y;
		// The first two and last two points are fixed:
		point.fixed = i < 2 || i > values.amount - 2;
		if (i > 0) {
			var spring = new Spring(segment.previous.point, point, strength);
			springs.push(spring);
		}
	}
	path.position.x -= size.width / 4;
	return path;
}

function onResize() {
	if (path)
		path.remove();
	size = view.bounds.size * [2, 1];
	path = createPath(0.1);
}

function onMouseMove(event) {
	var location = path.getNearestLocation(event.point);
	var segment = location.segment;
	var point = segment.point;

	if (!point.fixed && location.distance < size.height / 4) {
		var y = event.point.y;
		point.y += (y - point.y) / 6;
		if (segment.previous && !segment.previous.fixed) {
			var previous = segment.previous.point;
			previous.y += (y - previous.y) / 24;
		}
		if (segment.next && !segment.next.fixed) {
			var next = segment.next.point;
			next.y += (y - next.y) / 24;
		}
	}
//Code to make image follow the mouse 
	var fish = document.getElementById("fish");

	//Set fish style left in css to the value x of the cursor
	fish.style.left = event.point.x + "px";
	//Set fish style top in css to the value y of the cursor
	fish.style.top = event.point.y + "px";

}

function onFrame(event) {
	updateWave(path);
}

function updateWave(path) {
	var force = 1 - values.friction * values.timeStep * values.timeStep;
	for (var i = 0, l = path.segments.length; i < l; i++) {
		var point = path.segments[i].point;
		var dy = (point.y - point.py) * force;
		point.py = point.y;
		point.y = Math.max(point.y + dy, 0);
	}

	for (var j = 0, l = springs.length; j < l; j++) {
		springs[j].update();
	}
	path.smooth({ type: 'continuous' });
}


//Adds sound on click (code outside the event listener so that the sound will finish before you can click again)
var audio = new Audio('soundonclick.mp3');

//Click event listener added to click 
document.addEventListener("click", function(){

//Audio plays on click
	audio.play();
		
}); 





