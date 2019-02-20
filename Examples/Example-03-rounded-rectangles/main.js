//Where it starts on canvas 
var mousePoint = view.center;
//Amount of layers
var amount = 7;
//Colors of layers
var colors = ['#5942f4', '#a041f4', '#d63ff4', '#f23ad6', 'orange', 'white', 'green']

for (var i = 0; i < amount; i++) {
	//Measurements on rectangle
	var rect = new Rectangle([0, 0], [25, 25]);
	rect.center = mousePoint;
	//Roundness of square-corners
	var path = new Path.Rectangle(rect, 0);
	//Amounts of colors
	path.fillColor = colors[i % 7];
	//Scale on canvas
	var scale = (1 - i / amount) * 20;
	path.scale(scale);
}

function onMouseMove(event) {
	mousePoint = event.point;
}

function onMouseDown(event) {
	project.activeLayer.children = [];
	amount = amount + 7;
	for (var i = 0; i < amount; i++) {
		//Measurements on rectangle
		var rect = new Rectangle([0, 0], [25, 25]);
		rect.center = mousePoint;
		//Roundness of square-corners
		var path = new Path.Rectangle(rect, 0);
		//Amounts of colors
		path.fillColor = colors[i % 7];
		//Scale on canvas
		var scale = (1 - i / amount) * 20;
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
		item.rotate(Math.sin((event.count + i) / 10) * 7);
		if (delta.length > 0.1)
			item.position += delta;
			
	}
}