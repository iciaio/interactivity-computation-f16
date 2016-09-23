// This is a template for creating a looping animation in p5.js. 
// When you press a key, this program will export a series of images
// into an "output" directory located in its sketch folder. 
// These can then later be combined into an animated gif. 
// Known to work with p5.js version 0.5.3
// Prof. Golan Levin, September 2016

//===================================================
// Global variables. 
var nFramesInLoop = 120;
var nElapsedFrames;
var bRecording;
var bIAmRunningThisOnMyLaptop = true;
var size = 500;

var circle = {x: 250, y: 0, rad: 50}; //x, y, rad
var lineHeight = 250;
//===================================================
function setup() {
  createCanvas(500, 500);
  bRecording = false;
  nElapsedFrames = 0;
}

//===================================================
function keyPressed() {
  if (bIAmRunningThisOnMyLaptop) {
    bRecording = true;
    nElapsedFrames = 0;
  }
}

//===================================================
function draw() {

  // Compute a percentage (0...1) representing where we are in the loop.
  var percentCompleteFraction = 0;
  if (bRecording) {
    percentCompleteFraction = (nElapsedFrames) / (nFramesInLoop);
  } else {
    percentCompleteFraction = (frameCount % nFramesInLoop) / (nFramesInLoop);
  }

  // Render the design, based on that percentage. 
  renderMyDesign(percentCompleteFraction);

  // If we're recording the output, save the frame to a file. 
  // Note that the output images may be 2x large if you have a Retina mac. 
  // You can compile these frames into an animated GIF using a tool like: 
  if (bRecording & bIAmRunningThisOnMyLaptop) {
    var frameOutputFilename = "mynickname-loop-" + nf(nElapsedFrames, 4) + ".png";
    println("Saving output image: " + frameOutputFilename);
    saveCanvas(frameOutputFilename);
    nElapsedFrames++;
    if (nElapsedFrames >= nFramesInLoop) {
      bRecording = false;
    }
  }
}

//===================================================
function renderMyDesign(percent) {
  // This is an example of a function that renders a temporally looping design. 
  // It takes a "percent", between 0 and 1, indicating where we are in the loop. 
  // This example uses two different graphical techniques. 
  // Use or delete whatever you prefer from this example. 
  // Remember to SKETCH FIRST!

  //----------------------
  // here, I set the background and some other graphical properties

  background(0);
  smooth();
  stroke(255);
  strokeWeight(3);
  noFill();

  // line(0, lineHeight, 500, lineHeight);
  // var y = map(percent, 0, 1, 0, 500);
  // var ysquare = (y * y * y * y)/3 + 100;
  if (percent<0.5){
    var y = map(percent, 0, 0.5, 200, 342);
  } else {
    var y = map(percent, 0.5, 1, 342, 200);
  }
  var ysquare = y;
  circle.y = ysquare;
  // ellipse(circle.x, circle.y, 2*circle.rad, 2*circle.rad);
  
  var guidelineHeight = lineHeight + (circle.rad/2);
  var guideline2Height = lineHeight + (2*circle.rad);
  // line(0, guidelineHeight, 500, guidelineHeight);
  // line(0, guideline2Height, 500, guideline2Height);
  var A;
  var B;
  var E;
  var F;

  var topCircle = {x: circle.x, y: (circle.y - circle.rad)};
  var bottomCircle = {x: circle.x, y: (circle.y + circle.rad)};
  var rightCircle = {x: (circle.x - circle.rad), y: circle.y};
  var leftCircle = {x: (circle.x + circle.rad), y: circle.y};

  if (topCircle.y <= lineHeight){ //case 1, top of circle above/on line
    
    var intersectPoints = circleLineIntersect(lineHeight, circle.x, circle.y, circle.rad);
    A = {x: intersectPoints[0], y: intersectPoints[1]}
    B = {x: intersectPoints[2], y: intersectPoints[3]}

    // line(A.x, A.y, bottomCircle.x, bottomCircle.y);
    // line(B.x, B.y, bottomCircle.x, bottomCircle.y);
    
    var midABottomX = (A.x + bottomCircle.x)/2;
    var midABottomY = (A.y + bottomCircle.y)/2;
    var midBBottomX = (B.x + bottomCircle.x)/2;
    var midBBottomY = (B.y + bottomCircle.y)/2;

    nearPoint1 = nearestPointOnCircle(midABottomX, midABottomY, circle.x, circle.y, circle.rad);
    nearPoint2 = nearestPointOnCircle(midBBottomX, midBBottomY, circle.x, circle.y, circle.rad);

    var C = {x: nearPoint1[0], y: nearPoint1[1]};
    var D = {x: nearPoint2[0], y: nearPoint2[1]};

    var up = abs(C.y - bottomCircle.y);
    var over = abs(C.x - bottomCircle.x);
    
    var rightControl = lineIntersectAtHeight(lineHeight, bottomCircle.x + over, bottomCircle.y + up, A.x + over, A.y + up);
    var leftControl = lineIntersectAtHeight(lineHeight, bottomCircle.x - over, bottomCircle.y + up, B.x - over, B.y + up);
    
    var rightBezPointX = A.x + distanceTwoPoints(A.x, A.y, bottomCircle.x, bottomCircle.y);
    var leftBezPointX = B.x - distanceTwoPoints(B.x, B.y, bottomCircle.x, bottomCircle.y);

    bezier(C.x, C.y, rightControl[0], rightControl[1], rightControl[0], rightControl[1], 500, lineHeight);
    bezier(D.x, D.y, leftControl[0], leftControl[1], leftControl[0], leftControl[1], 0, lineHeight);

    var angle = getAngle(circle.y, circle.rad, D.y);

    if (bottomCircle.y > lineHeight){
      arc(circle.x, circle.y, 2*circle.rad, 2*circle.rad, 2*PI+angle, PI-angle);
    }
  }
  
  else{
    var intersectPoints = circleLineIntersect(guideline2Height, circle.x, circle.y, circle.rad);
    E = {x: intersectPoints[0], y: intersectPoints[1]}
    F = {x: intersectPoints[2], y: intersectPoints[3]}

    var midETopX = (E.x + topCircle.x)/2;
    var midETopY = (E.y + topCircle.y)/2;
    var midFTopX = (F.x + topCircle.x)/2;
    var midFTopY = (F.y + topCircle.y)/2;

    nearPoint1 = nearestPointOnCircle(midETopX, midETopY, circle.x, circle.y, circle.rad);
    nearPoint2 = nearestPointOnCircle(midFTopX, midFTopY, circle.x, circle.y, circle.rad);

    var C = {x: nearPoint1[0], y: nearPoint1[1]};
    var D = {x: nearPoint2[0], y: nearPoint2[1]};

    var up = abs(D.y - midFTopY);
    var over = abs(D.x - midFTopX);
    
    var rightControl = lineIntersectAtHeight(lineHeight, topCircle.x + over, topCircle.y + up, E.x + over, E.y + up);
    var leftControl = lineIntersectAtHeight(lineHeight, topCircle.x - over, topCircle.y + up, F.x - over, F.y + up);
    
    var leftBezPointX = topCircle.x - (2*(topCircle.x-D.x));
    var rightBezPointX = topCircle.x + (2*(C.x-topCircle.x));
    
    bezier(C.x, C.y, rightControl[0], rightControl[1], rightControl[0], rightControl[1], 500, lineHeight);
    bezier(D.x, D.y, leftControl[0], leftControl[1], leftControl[0], leftControl[1], 0, lineHeight);

    var angle = getAngle(circle.y, circle.rad, D.y);

    arc(circle.x, circle.y, 2*circle.rad, 2*circle.rad, 2*PI+angle, PI-angle);
  }
}

function circleLineIntersect(h, cx, cy, cr) {
  var x1 = sqrt((cr*cr)-((h-cy)*(h-cy))) + cx;
  var x2 = -sqrt((cr*cr)-((h-cy)*(h-cy))) + cx;

  return([x1,h,x2,h]);
}

function nearestPointOnCircle(x, y, cx, cy, r){
  var vx = x - cx;
  var vy = y - cy;
  var magV = sqrt(vx*vx + vy*vy);
  return [(cx + vx / magV * r), (cy + vy / magV * r)];
}

function lineIntersectAtHeight(h, x1, y1, x2, y2){
  var m = (y1-y2)/(x1-x2);
  var b = y1 - ((y1-y2)/(x1-x2))*x1;
  var x = (h-b)/m;
  return [x, h];
}

function distanceTwoPoints(x1, y1, x2, y2){
  return sqrt( ((x1-x2)*(x1-x2)) + ((y1-y2)*(y1-y2)) );
}

function getAngle(cy, r, y){
  return asin((y-cy)/r)
}
