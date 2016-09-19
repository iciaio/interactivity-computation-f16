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
var size = 500;

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
  background(0);
  smooth();
  stroke(255);
  noFill();
  strokeWeight(1);

  var dist = 1;
  for (var i = 500/2; i < 500; i+=dist){
    line(0, i, 500, i);
    dist*=1.2;
  }

  for (var j = PI/2; j < 3*PI/2; j+=PI/14){
    line(250,250,250+400*(-sin(j)),250+400*(-cos(j)));
  }

  var amount = 500;
  var frequency = 1/15;
  var offset = random(200)+5;
  var startY = height/2;
    beginShape();
      vertex(0, startY);
       for (var c=1; c < amount; c++) {
         var sinoffset = sin(frequency*c);
         var sinX = c*(width/amount);
         var sinY = startY + (sinoffset*offset);
         bezierVertex(sinX,sinY,sinX,sinY-1,sinX,sinY);
       }
    endShape();
}