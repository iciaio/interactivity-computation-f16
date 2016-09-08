int numLines = 12;
int lineLen = 300;

float[][] lineList = new float[numLines][6];

void setup(){
  size(720,480);
  background(255,240,240);
}

void mouseClicked(){
  generateLines(numLines);
  drawLines();
}

void draw(){
}

void drawLines(){
  clear();
  background(255,240,240);
  fill(255, 200, 200);
  noStroke();
  drawIntersects();
  stroke(0,0,0);
  for (int i = 0; i < numLines; i++){
    float x = lineList[i][0];
    float y = lineList[i][1];
    float x1 = lineList[i][2];
    float y1 = lineList[i][3];
    line(x,y,x1,y1);
  }
}

void generateLines(int num){
  
  for (int i = 0; i < num; i++){
    float angle = random(-90,90);

    float rise = lineLen * sin(angle);
    float run = lineLen * cos(angle);
    
    float x = random(0,700);
    float y = random(0,460);
    
    float x1 = x + run;
    float y1 = y + rise;
    
    float slope = rise/run;
    float intersept = y - (slope * x);
    
    float[] newPoints = {x, y, x1, y1, slope, intersept};
    
    lineList[i] = newPoints;
  }
  
}

void drawIntersects(){
  for (int i = 0; i < numLines; i++){
      float x = lineList[i][0];
      float y = lineList[i][1];
      float q = lineList[i][2];
      float r = lineList[i][3];
      float m = lineList[i][4];
      float b = lineList[i][5];
      
    for (int j = i+1; j< numLines; j++){
      float x1 = lineList[j][0];
      float y1 = lineList[j][1];
      float q1 = lineList[j][2];
      float r1 = lineList[j][3];
      float m1 = lineList[j][4];
      float b1 = lineList[j][5];      
      
      float newX = (b1-b)/(m-m1);
      float newY = m * newX + b;
      
      if (between(x,q,newX) && between(y,r,newY) && between(x1,q1,newX) && between(y1,r1,newY)) {
        ellipse(newX, newY, 20, 20);
      }
    }
  }
}

boolean between(float a, float b, float target){
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