//Where it starts on canvas 
var mousePoint = view.center;
//Amount of layers
var amount = 7;
//Colors of layers
var colors = ['#5942f4', '#a041f4', '#d63ff4', '#f23ad6', 'orange', 'white', 'green']

for (var i = 0; i < amount; i++) {
	//Measurements of star
	var path = new Path.Star(mousePoint, 5, 15, 30);
	//Amounts of colors
	path.fillColor = colors[i % 7];
	//Scale on canvas
	var scale = (1 - i / amount) * 10;
	path.scale(scale);
}

function onMouseMove(event) {
	mousePoint = event.point;
}

function onMouseDown(event) {
	project.activeLayer.children = [];
	amount = amount + 7;
	for (var i = 0; i < amount; i++) {
		//Measurements of star
		var path = new Path.Star(mousePoint, 5, 15, 30);
		//Amounts of colors
		path.fillColor = colors[i % 7];
		//Scale on canvas
		var scale = (1 - i / amount) * 10;
		path.scale(scale);
	}
	console.log(amount);
}

var children = project.activeLayer.children;
function onFrame(event) {
	for (var i = 0, l = children.length; i < l; i++) {
		var item = children[i];
		//Movement of the square
		var delta = (mousePoint - item.position) / (i + 5);
		//Rotate speed
		item.rotate(Math.sin((event.count + i) / 15) * 5);
		if (delta.length > 0.1)
			item.position += delta;
			
	}
}