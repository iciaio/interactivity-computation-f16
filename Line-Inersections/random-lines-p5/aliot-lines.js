
var numLines = 12;
var lineLen = 300;

var lineList = [];

function setup(){
	createCanvas(720,480);
	background(255,240,240);
	generateLines(numLines);
}

function mousePressed(){
	generateLines(numLines);
}

function generateLines(num){
	for (var i = 0; i < num; i++){
		var angle = random(-90,90);

		var rise = lineLen * sin(angle);
		var run = lineLen * cos(angle);

		var x = random(0,700);
		var y = random(0,460);

		var x1 = x + run;
		var y1 = y + rise;

		var slope = rise/run;
		var intersept = y - (slope * x);

		var newPoints = [x, y, x1, y1, slope, intersept];
		lineList[i] = newPoints;
	}
}

function draw(){
	clear();
	background(255,240,240);
	fill(255,200,200);
	noStroke();
	for (var i = 0; i < numLines; i++){
		var x = lineList[i][0];
		var y = lineList[i][1];
		var q = lineList[i][2];
		var r = lineList[i][3];
		var m = lineList[i][4];
		var b = lineList[i][5];

		for (var j = i+1; j< numLines; j++){
			var x1 = lineList[j][0];
			var y1 = lineList[j][1];
			var q1 = lineList[j][2];
			var r1 = lineList[j][3];
			var m1 = lineList[j][4];
			var b1 = lineList[j][5];      

			var newX = (b1-b)/(m-m1);
			var newY = m * newX + b;

			if (between(x,q,newX) && between(y,r,newY) && between(x1,q1,newX) && between(y1,r1,newY)) {
				ellipse(newX, newY, 15, 15);
			}
		}
	}
	stroke(0,0,0);
	for (var i = 0; i < numLines; i++){
		var x = lineList[i][0];
		var y = lineList[i][1];
		var x1 = lineList[i][2];
		var y1 = lineList[i][3];
		line(x,y,x1,y1);
	}
}

function between(a, b, target){
	if (a < b){
		return (a < target && target < b);
	} else if (a > b) {
		return (b < target && target < a);
	} else if (a == b){
		return (target == a);
	} else {
		return false;
	}
}