var canvasSize = 600;
var lineLen = 15;
var baseAngle;
var cellWidth;
var cellHeight;
var interruptions = [];

function setup(){
  createCanvas(600,600);
  background(255,255,255);
  randomChunks();
  drawLines();
}

function randomChunks(){
  var numChunks = (random(3,10));
  for (var i = 0; i < numChunks; i++){
    var x = random(0, (canvasSize));
    var y = random(0, (canvasSize));
    var w = random(10,100);
    var h = random(10,100);
    interruptions[i] = [x,y,w,h];
    fill(0,255,255);
  }
}

function drawLines(){
  baseAngle = random(-90,90);
  cellHeight = (abs(0.2*(lineLen) * 0.8*sin(baseAngle)) + lineLen);
  cellWidth = (abs(0.2*(lineLen) * 0.8*cos(baseAngle)) + lineLen);
  for (var i = 0; i < canvasSize/cellWidth; i++){
    for (var j = 0; j < canvasSize/cellHeight; j++){
      if ((i >= 3) && (i <= (canvasSize/cellWidth)-3) && (j >= 3) && (j <= (canvasSize/cellHeight)-3) ){
        randLineInBox(i*cellWidth,j*cellHeight,(i+1)*cellWidth,(j+1)*cellHeight);
      }
    }
  }
}

function randLineInBox(a, b, c, d){
  if (!isInterrupted(a,b,c,d)){
    var angle = randomGaussian()*0.6 + baseAngle;
  
    var rise = (lineLen+10) * sin(angle);
    var run = (lineLen+10) * cos(angle);
    
    var x = random(a,c);
    var y = random(b,d);
    
    var x1 = x + run;
    var y1 = y + rise;
    
    var slope = rise/run;
    
    line(x,y,x1,y1);
  }
}

function mousePressed(){
  background(255,255,255);
  randomChunks();
  drawLines();
}

function isInterrupted(x0, y0, x1, y1){
  for (var i = 0; i < interruptions.length; i++){
    var x = interruptions[i][0];
    var y = interruptions[i][1];
    var w = interruptions[i][2];
    var h = interruptions[i][3];
    if ((((x0 > x) && (x0 < x+w)) || ((x1 > x) && (x1 < x+w)))
     && (((y0 > y) && (y0 < y+h)) || ((y1 > y) && (y1 < y+h)))){
       return true;
    }
  }
  return false;
}