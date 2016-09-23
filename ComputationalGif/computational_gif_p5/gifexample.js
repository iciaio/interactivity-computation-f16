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
var bIAmRunningThisOnMyLaptop = false;

//===================================================
function setup() {
  createCanvas(500, 200);
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
    percentCompleteFraction = float(nElapsedFrames) / float(nFramesInLoop);
  } else {
    percentCompleteFraction = float(frameCount % nFramesInLoop) / float(nFramesInLoop);
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
  background(180);
  smooth();
  stroke(0, 0, 0);
  strokeWeight(2);

  //----------------------
  // Here, I assign some handy variables. 
  var cx = 100;
  var cy = 100;

  //----------------------
  // Here, I use trigonometry to render a rotating element.
  var radius = 80;
  var rotatingArmAngle = percent * TWO_PI;
  var px = cx + radius * cos(rotatingArmAngle);
  var py = cy + radius * sin(rotatingArmAngle);
  fill(255);
  line(cx, cy, px, py);
  ellipse(px, py, 20, 20);

  //----------------------
  // Here, I use graphical transformations to render a rotated square. 
  push();
  translate(cx, cy);
  var rotatingSquareAngle = percent * TWO_PI * -0.25;
  rotate(rotatingSquareAngle);
  fill(255, 128);
  rect(-40, -40, 80, 80);
  pop();

  //----------------------
  // Here's a linearly-moving square
  var squareSize = 20;
  var topY = 0 - squareSize - 2;
  var botY = height + 2;
  var yPosition = map(percent, 0, 1, topY, botY);
  fill(255, 255, 255);
  rect(250, yPosition, 20, 20);

  //----------------------
  // Here's a pulsating ellipse
  var ellipsePulse = sin(3.0 * percent * TWO_PI);
  var ellipseW = map(ellipsePulse, -1, 1, 20, 50);
  var ellipseH = map(ellipsePulse, -1, 1, 50, 30);
  var ellipseColor = map(ellipsePulse, -1, 1, 128, 255);
  fill(255, ellipseColor, ellipseColor);
  ellipse(350, cy, ellipseW, ellipseH);

  //----------------------
  // Here's a travelling sine wave
  stroke(0, 0, 0);
  for (var sy = 0; sy <= height; sy += 4) {
    var t = map(sy, 0, height, 0.0, 0.25);
    var sx = 450 + 25.0 * sin((t + percent) * TWO_PI);
    ellipse(sx, sy, 1, 1);
  }

  //----------------------
  // Include some visual feedback. 
  fill(255, 0, 0);
  noStroke();
  textAlign(CENTER);
  var percentDisplayString = "" + nf(percent, 1, 3);
  text(percentDisplayString, cx, cy - 15);
}