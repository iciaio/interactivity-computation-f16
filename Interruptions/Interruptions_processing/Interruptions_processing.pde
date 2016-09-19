int canvasSize = 600;
int lineLen = 15;
float baseAngle;
float cellWidth;
float cellHeight;
float[][] interruptions;

void setup(){
  background(255, 255, 255);
  size(600,600);
  randomChunks();
  drawLines();
}

void draw(){

}

void randomChunks(){
  int numChunks = int(random(3,10));
  interruptions = new float[numChunks][4];
  for (int i = 0; i < numChunks; i++){
    float x = random(0, int(canvasSize));
    float y = random(0, int(canvasSize));
    float w = random(10,100);
    float h = random(10,100);
    interruptions[i][0] = x;
    interruptions[i][1] = y;
    interruptions[i][2] = w;
    interruptions[i][3] = h;
    fill(0,255,255);
  }
}

void drawLines(){
  baseAngle = random(-90,90);
  cellHeight = (abs(0.2*(lineLen) * 0.8*sin(baseAngle)) + lineLen);
  cellWidth = (abs(0.2*(lineLen) * 0.8*cos(baseAngle)) + lineLen);
  for (int i = 0; i < canvasSize/cellWidth; i++){
    for (int j = 0; j < canvasSize/cellHeight; j++){
      if ((i >= 3) && (i <= (canvasSize/cellWidth)-3) && (j >= 3) && (j <= (canvasSize/cellHeight)-3) ){
        randLineInBox(i*cellWidth,j*cellHeight,(i+1)*cellWidth,(j+1)*cellHeight);
      }
    }
  }
}

void randLineInBox(float a, float b, float c, float d){
  if (!isInterrupted(a,b,c,d)){
    float angle = randomGaussian()*0.6 + baseAngle;
  
    float rise = (lineLen+10) * sin(angle);
    float run = (lineLen+10) * cos(angle);
    
    float x = random(a,c);
    float y = random(b,d);
    
    float x1 = x + run;
    float y1 = y + rise;
    
    float slope = rise/run;
    
    line(x,y,x1,y1);
  }
}

void mouseClicked(){
  background(255,255,255);
  randomChunks();
  drawLines();
}

boolean isInterrupted(float x0, float y0, float x1, float y1){
  for (int i = 0; i < interruptions.length; i++){
    float x = interruptions[i][0];
    float y = interruptions[i][1];
    float w = interruptions[i][2];
    float h = interruptions[i][3];
    //println(x0, x, x1);
    //println(y0, y, y1);
    if ((((x0 > x) && (x0 < x+w)) || ((x1 > x) && (x1 < x+w)))
     && (((y0 > y) && (y0 < y+h)) || ((y1 > y) && (y1 < y+h)))){
       return true;
    }
  }
  return false;
}