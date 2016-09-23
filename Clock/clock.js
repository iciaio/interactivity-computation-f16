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

var H; 
var M; 
var S;
var hourWithFraction;
var mils;
var secondsWithFraction;
var minuteWithFraction;


//--------------------------
function setup() {
  colorMode(HSB,100);
  createCanvas(canW, canH);
  millisRolloverTime = 0;
  time();
  genCircleColors();
}

function time(){
  H = hour();
  M = minute();
  S = second();

  if (prevSec != S) {
    millisRolloverTime = millis();
  }
  prevSec = S;
  mils = floor(millis() - millisRolloverTime);
  secondsWithFraction   = S + (mils / 1000.0);
  hourWithFraction = H + (M/60.0) + (S/3600.0);
  minuteWithFraction = M + (S/60.0);
}

//--------------------------
function draw() {
  time();
  background(255);

  //big outer circle, rad = width
  fill(O_col.h, O_col.s, O_col.b);
  noStroke();
  ellipse(canW/2,canH/2,w,h);

  //day circle

  var D_diam = 250;
  var D_pathRad = (w/2) - (D_diam/2);
  var D_t = map(hourWithFraction,1,12,5,60);
  var D_angle = ((D_t*PI)/30)+(3*PI/2);
  
  var D_y = sin(D_angle) * D_pathRad;
  var D_x = cos(D_angle) * D_pathRad;

  fill(D_col.h, D_col.s, D_col.b);
  noStroke();
  ellipse((canW/2)+D_x, (canH/2)+D_y, D_diam, D_diam);
  
  //hour circle

  var H_diam = 125;
  var H_pathRad = (D_diam/2) - (H_diam/2);
  var H_t = map(minuteWithFraction,1,60,1,60);
  var H_angle = ((H_t*PI)/30)+(3*PI/2);

  var H_y = D_y + (sin(H_angle) * H_pathRad);
  var H_x = D_x + (cos(H_angle) * H_pathRad);

  fill(H_col.h, H_col.s, H_col.b);
  noStroke();
  ellipse(canW/2 + H_x, canH/2 + H_y, H_diam, H_diam);
  
  //minute circle

  var M_diam = 50;
  var M_pathRad = (H_diam/2) + (M_diam/2);
  var M_t = map(secondsWithFraction,1,60,0,59);
  var M_angle = ((M_t*PI)/30)+(3*PI/2);

  var M_y = H_y + (sin(M_angle) * M_pathRad);
  var M_x = H_x + (cos(M_angle) * M_pathRad);

  fill(M_col.h, M_col.s, M_col.b);
  noStroke();
  ellipse(canW/2 + M_x, canH/2 + M_y, M_diam, M_diam);

  //second circle

  var S_diam = 20;
  var S_pathRad = (M_diam/2) - (S_diam/2);
  var S_t = map(mils,0,1000,0,1000);
  var S_angle = ((S_t*PI)/500)+(3*PI/2);

  var S_y = M_y + (sin(S_angle) * S_pathRad);
  var S_x = M_x + (cos(S_angle) * S_pathRad);

  fill(S_col.h, S_col.s, S_col.b);
  noStroke();
  ellipse(canW/2 + S_x, canH/2 + S_y, S_diam, S_diam);

  // fill(0);
  // text("Hour: "   + H, 10, 22);
  // text("Minute: " + M, 10, 42);
  // text("Second: " + S, 10, 62);
  // text("Millis: " + mils, 10, 82);

}

function genCircleColors(){
    
  var hourWF = hourWithFraction;
  var H = random(0,100);
  if (hourWF > 12){
    hourWF = (hourWF - 2*(hourWF - 12));
  }
  var S = map(hourWF, 0, 12, 50, 90); //6am-12pm pastel to saturated, 12pm-6pm saturated to less bright
  var B = map(hourWF, 0, 12, 30, 90); 
    
  console.log(H,S,B);
  // O_col = {h: (H+30)%100, s: S, b: B};
  // D_col = {h: (H+10)%100, s: S, b: B};
  // H_col = {h: (H+70)%100, s: S, b: B};
  // M_col = {h: (H+50)%100, s: S, b: B};
  // S_col = {h: (H-10)%100, s: S, b: B};
  O_col = {h: (H+30)%100, s: S, b: B};
  D_col = {h: (H+10)%100, s: S, b: B};
  H_col = {h: (H+70)%100, s: S, b: B};
  M_col = {h: (H+50)%100, s: S, b: B};
  S_col = {h: (H-10)%100, s: S, b: B};}

function mousePressed(){
  genCircleColors()
}