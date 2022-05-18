class Cannon {
  constructor(x, y, width, height, angle) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.base=loadImage("assets/cannonBase.png");
    this.topo=loadImage("assets/canon.png");
  }
  
  mostrar(){
  if(keyIsDown(RIGHT_ARROW)){
    this.angle+=1;
  }
  if(keyIsDown(LEFT_ARROW)){
    this.angle-=1;
  }
  push();
  translate (this.x,this.y);
  rotate (this.angle);  
  imageMode (CENTER);
    image (this.topo,0,0,this.width,this.height);//topo do canhão 
  pop ();
  image(this.base,70,20,200,200);
  }
}
