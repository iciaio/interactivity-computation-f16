var prevSec;
var millisRolloverTime;
var canW = 700;
var canH = 700;
var w = 500;
var h = 500;
var O_col;
var D_col;
var M_col;
var H_col;
var S_col;


//--------------------------
function setup() {
  createCanvas(canW, canH);
  millisRolloverTime = 0;
  genCircleColors();
}

//--------------------------
function draw() {
  //golan's code
  background(255);

  var H = hour();
  var M = minute();
  var S = second();

  if (prevSec != S) {
    millisRolloverTime = millis();
  }
  prevSec = S;
  var mils = floor(millis() - millisRolloverTime);
  var secondsWithFraction   = S + (mils / 1000.0);
  var hourWithFraction = H + (M/60.0) + (S/3600.0);
  var minuteWithFraction = M + (S/60.0);
  // end golan's code

  //big outer circle, rad = width
  fill(O_col.r, O_col.g, O_col.b);
  noStroke();
  ellipse(canW/2,canH/2,w,h);

  //day circle

  var D_diam = 250;
  var D_pathRad = (w/2) - (D_diam/2);
  var D_t = map(hourWithFraction,1,12,5,60);
  var D_angle = ((D_t*PI)/30)+(3*PI/2);
  
  var D_y = sin(D_angle) * D_pathRad;
  var D_x = cos(D_angle) * D_pathRad;

  fill(D_col.r, D_col.g, D_col.b);
  noStroke();
  ellipse((canW/2)+D_x, (canH/2)+D_y, D_diam, D_diam);
  
  //hour circle

  var H_diam = 125;
  var H_pathRad = (D_diam/2) - (H_diam/2);
  var H_t = map(minuteWithFraction,1,60,1,60);
  var H_angle = ((H_t*PI)/30)+(3*PI/2);

  var H_y = D_y + (sin(H_angle) * H_pathRad);
  var H_x = D_x + (cos(H_angle) * H_pathRad);

  fill(H_col.r, H_col.g, H_col.b);
  noStroke();
  ellipse(canW/2 + H_x, canH/2 + H_y, H_diam, H_diam);
  
  //minute circle

  var M_diam = 50;
  var M_pathRad = (H_diam/2) + (M_diam/2);
  var M_t = map(secondsWithFraction,1,60,0,59);
  var M_angle = ((M_t*PI)/30)+(3*PI/2);

  var M_y = H_y + (sin(M_angle) * M_pathRad);
  var M_x = H_x + (cos(M_angle) * M_pathRad);

  fill(M_col.r, M_col.g, M_col.b);
  noStroke();
  ellipse(canW/2 + M_x, canH/2 + M_y, M_diam, M_diam);

  //second circle

  var S_diam = 20;
  var S_pathRad = (M_diam/2) - (S_diam/2);
  var S_t = map(mils,0,1000,0,1000);
  var S_angle = ((S_t*PI)/500)+(3*PI/2);

  var S_y = M_y + (sin(S_angle) * S_pathRad);
  var S_x = M_x + (cos(S_angle) * S_pathRad);

  fill(S_col.r, S_col.g, S_col.b);
  noStroke();
  ellipse(canW/2 + S_x, canH/2 + S_y, S_diam, S_diam);

  // fill(0);
  // text("Hour: "   + H, 10, 22);
  // text("Minute: " + M, 10, 42);
  // text("Second: " + S, 10, 62);
  // text("Millis: " + mils, 10, 82);

}

function genCircleColors(){
  O_col = {r: random(0,255), g: random(0,255), b: random(0,255)};
  D_col = {r: random(0,255), g: random(0,255), b: random(0,255)};
  H_col = {r: random(0,255), g: random(0,255), b: random(0,255)};
  M_col = {r: random(0,255), g: random(0,255), b: random(0,255)};
  S_col = {r: random(0,255), g: random(0,255), b: random(0,255)};
}

function mousePressed(){
  genCircleColors()
}