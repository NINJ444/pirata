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
  push();
    imageMode (CENTER);
    image (this.topo,this.x,this.y,this.width,this.height);//topo do canhão 
  pop ();
  image(this.base,70,20,200,200);
  }
}
