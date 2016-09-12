var prevSec;
var millisRolloverTime;
var canW = 700;
var canH = 700;
var w = 500;
var h = 500;
// var hour_input;
// var min_input;
// var am_pm_input;
// var alarm;
// var alarm_set = false;
//--------------------------
function setup() {
  createCanvas(canW, canH);
  millisRolloverTime = 0;

//   hour_input = createSelect();
//   hour_input.position(250, 20);
//   hour_input.option('1');
//   hour_input.option('2');
//   hour_input.option('3');
//   hour_input.option('4');
//   hour_input.option('5');
//   hour_input.option('6');  
//   hour_input.option('7');
//   hour_input.option('8');
//   hour_input.option('9');  
//   hour_input.option('10');
//   hour_input.option('11');
//   hour_input.option('12');

//   min_input = createSelect();
//   min_input.position(305, 20);
//   min_input.option('00');
//   min_input.option('01');
//   min_input.option('02');
//   min_input.option('03');
//   min_input.option('04');
//   min_input.option('05');
//   min_input.option('06');  
//   min_input.option('07');
//   min_input.option('08');
//   min_input.option('09');  
//   min_input.option('10');
//   min_input.option('11');
//   min_input.option('12');
//   min_input.option('13');
//   min_input.option('14');
//   min_input.option('15');
//   min_input.option('16');  
//   min_input.option('17');
//   min_input.option('18');
//   min_input.option('19');  
//   min_input.option('20');  
//   min_input.option('21');
//   min_input.option('22');
//   min_input.option('23');
//   min_input.option('24');
//   min_input.option('25');
//   min_input.option('26');  
//   min_input.option('27');
//   min_input.option('28');
//   min_input.option('29');  
//   min_input.option('30');
//   min_input.option('31');
//   min_input.option('32');
//   min_input.option('33');
//   min_input.option('34');
//   min_input.option('35');
//   min_input.option('36');  
//   min_input.option('37');
//   min_input.option('38');
//   min_input.option('39');  
//   min_input.option('40');
//   min_input.option('41');
//   min_input.option('42');
//   min_input.option('43');
//   min_input.option('44');
//   min_input.option('45');
//   min_input.option('46');  
//   min_input.option('47');
//   min_input.option('48');
//   min_input.option('49');  
//   min_input.option('50');
//   min_input.option('51');
//   min_input.option('52');
//   min_input.option('53');
//   min_input.option('54');
//   min_input.option('55');
//   min_input.option('56');  
//   min_input.option('57');
//   min_input.option('58');
//   min_input.option('59');  

//   am_pm_input = createSelect();
//   am_pm_input.position(360, 20);
//   am_pm_input.option('am');
//   am_pm_input.option('pm');

//   alarm = createButton("Alarm");
//   alarm.position(450, 20);
//   alarm.mousePressed(setAlarm);
}

//--------------------------
function draw() {
  //golan's code
  background(200); // Golan's favorite pink

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
  fill(255);
  noStroke();
  ellipse(canW/2,canH/2,w,h);

  //day circle

  var D_diam = 250;
  var D_pathRad = (w/2) - (D_diam/2);
  var TESTHOUR = 12.0;
  var D_t = map(hourWithFraction,1,12,5,60); //change to hourWithFraction
  var D_angle = ((D_t*PI)/30)+(3*PI/2);
  
  var D_y = sin(D_angle) * D_pathRad;
  var D_x = cos(D_angle) * D_pathRad;

  fill(100);
  noStroke();
  ellipse((canW/2)+D_x, (canH/2)+D_y, D_diam, D_diam);
  
  // if (alarm_set){
  //   var D_alarm_t = map(float(hour_input.value()) + (float(min_input.value())/60.0),1,12,5,60); //change to hourWithFraction
  //   var D_alarm_angle = ((D_alarm_t*PI)/30)+(3*PI/2);
  //   var D_alarm_y = sin(D_alarm_angle) * D_pathRad;
  //   var D_alarm_x = cos(D_alarm_angle) * D_pathRad;
  //   noFill();
  //   stroke(255,0,0);
  //   ellipse((canW/2)+D_alarm_x, (canH/2)+D_alarm_y, D_diam, D_diam);
  // }
  //hour circle

  var H_diam = 125;
  var H_pathRad = (D_diam/2) - (H_diam/2);
  var H_t = map(minuteWithFraction,1,60,1,60);
  var H_angle = ((H_t*PI)/30)+(3*PI/2);

  var H_y = D_y + (sin(H_angle) * H_pathRad);
  var H_x = D_x + (cos(H_angle) * H_pathRad);

  fill(0);
  noStroke();
  ellipse(canW/2 + H_x, canH/2 + H_y, H_diam, H_diam);
  
  // if (alarm_set){
  //   var H_alarm_t = map(min_input.value()/1.0,1,60,1,60); //change to hourWithFraction
  //   var H_alarm_angle = ((H_alarm_t*PI)/30)+(3*PI/2);
  //   var H_alarm_y = D_alarm_y + sin(H_alarm_angle) * H_pathRad;
  //   var H_alarm_x = D_alarm_x + cos(H_alarm_angle) * H_pathRad;
  //   noFill();
  //   stroke(255,0,0);
  //   ellipse((canW/2)+H_alarm_x, (canH/2)+H_alarm_y, H_diam, H_diam);
  // }

  //minute circle

  var M_diam = 50;
  var M_pathRad = (H_diam/2) + (M_diam/2);
  var M_t = map(secondsWithFraction,1,60,0,59);
  var M_angle = ((M_t*PI)/30)+(3*PI/2);

  var M_y = H_y + (sin(M_angle) * M_pathRad);
  var M_x = H_x + (cos(M_angle) * M_pathRad);

  fill(180);
  noStroke();
  ellipse(canW/2 + M_x, canH/2 + M_y, M_diam, M_diam);

  // if (alarm_set){
  //   var M_alarm_t = map(0.0,1,60,0,59); //change to hourWithFraction
  //   var M_alarm_angle = ((M_alarm_t*PI)/30)+(3*PI/2);
  //   var M_alarm_y = H_alarm_y + sin(M_alarm_angle) * M_pathRad;
  //   var M_alarm_x = H_alarm_x + cos(M_alarm_angle) * M_pathRad;
  //   noFill();
  //   stroke(255,0,0);
  //   ellipse((canW/2)+M_alarm_x, (canH/2)+M_alarm_y, M_diam, M_diam);
  // }

  //second circle

  var S_diam = 20;
  var S_pathRad = (M_diam/2) - (S_diam/2);
  var S_t = map(mils,0,1000,0,1000);
  var S_angle = ((S_t*PI)/500)+(3*PI/2);

  var S_y = M_y + (sin(S_angle) * S_pathRad);
  var S_x = M_x + (cos(S_angle) * S_pathRad);

  fill(60);
  noStroke();
  ellipse(canW/2 + S_x, canH/2 + S_y, S_diam, S_diam);

  // if (alarm_set){
  //   var S_alarm_t = map(1.0,0,1000,0,1000); //change to hourWithFraction
  //   var S_alarm_angle = ((S_alarm_t*PI)/500)+(3*PI/2);
  //   var S_alarm_y = M_alarm_y + sin(S_alarm_angle) * S_pathRad;
  //   var S_alarm_x = M_alarm_x + cos(S_alarm_angle) * S_pathRad;
  //   noFill();
  //   stroke(255,0,0);
  //   ellipse((canW/2)+S_alarm_x, (canH/2)+S_alarm_y, S_diam, S_diam);
  // }

  fill(0);
  text("Hour: "   + H, 10, 22);
  text("Minute: " + M, 10, 42);
  text("Second: " + S, 10, 62);
  text("Millis: " + mils, 10, 82);
  // if (alarm_set){
  //   var mil_hour = hour_input.value();
  //   if (am_pm_input.value() === "pm"){
  //     mil_hour = hour_input.value();
  //     console.log(mil_hour);
  //     console.log(H);
  //     console.log(min_input.value());
  //     console.log(M);
  //   }
  //   if (float(H) === float(mil_hour) && float(M) === float(min_input.value())){
  //     osc = new p5.Oscillator();
  //     osc.setType('sine');
  //     osc.freq(240);
  //     osc.amp(0.5);
  //     osc.start();
  //   }
  // }

}

// function setAlarm(){
//   alarm_set = !alarm_set;
// }