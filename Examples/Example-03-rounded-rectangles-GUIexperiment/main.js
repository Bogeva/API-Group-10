//Where stack starts on canvas 
var mousePoint = view.center;
	
//Variables for sliders
var amount = 7;
var twistNumber = 5;
var speedNumber = 5;
var roundnessNumber = 0;

//Colors of layers
var colors = ['#5942f4', '#a041f4', '#d63ff4', '#f23ad6', 'orange', 'white', 'green']

//First loop
for (var i = 0; i < amount; i++) {
	//Measurements on rectangle
	var rect = new Rectangle([0, 0], [25, 25]);
	rect.center = mousePoint;
	//Roundness of square-corners
	var path = new Path.Rectangle(rect, roundnessNumber);
	//Amounts of colors
	path.fillColor = colors[i % 7];
	//Scale on canvas
	var scale = (1 - i / amount) * 20;
	path.scale(scale);
}

//The stack following the mouse
function onMouseMove(event) {
	mousePoint = event.point;
}

//When clicking the mouse
function onMouseDown(event) {
	project.activeLayer.children = [];
	//Adding 7 layers each time the mouse is clicked
	amount = amount + 7;
	for (var i = 0; i < amount; i++) {
		//Measurements on rectangle
		var rect = new Rectangle([0, 0], [25, 25]);
		rect.center = mousePoint;
		//Roundness of square-corners
		var path = new Path.Rectangle(rect, roundnessNumber);
		//Amounts of colors
		path.fillColor = colors[i % 7];
		//Scale on canvas
		var scale = (1 - i / amount) * 20;
		path.scale(scale);
	}
	console.log(amount);
}

//Animation
var children = project.activeLayer.children;
function onFrame(event) {
	for (var i = 0, l = children.length; i < l; i++) {
		var item = children[i];
		//Movement of the square
		var delta = (mousePoint - item.position) / (i + 5);
		//Rotate speed
		item.rotate(Math.sin((event.count + i) / twistNumber) * speedNumber);
		if (delta.length > 0.1)
			item.position += delta;
			
	}
}

//Sliders
var speedSlider = document.getElementById("speed-number");
var twistSlider = document.getElementById("twist-number");
var roundnessSlider = document.getElementById("roundness-number");

speedSlider.addEventListener("change", handleSliders, false);
twistSlider.addEventListener("change", handleSliders, false);
roundnessSlider.addEventListener("change", handleRoundnessSlider, false);

function handleSliders(event) {
    twistNumber = twistSlider.value;
	speedNumber = speedSlider.value;
}

function handleRoundnessSlider(event) {
	roundnessNumber = roundnessSlider.value;
}