const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon, ball;
var balls=[];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);
  
  angleMode(DEGREES);
  angle=10;
  
  cannon=new Cannon(180,110,130,100,angle);

  
  //matrizes
  var m1 = [1,2,3,4,5];
  //i       0 1 2 3 4
  //console.log(m1[2]);

  var m2 = [[0,1], [2,3], [4,5]];
  //i         0      1      2
  //i        0,1    0,1    0,1 
  
  console.log(m2[0][0]);

}

function draw() {
  image(backgroundImg,0,0,1200,600)
  Engine.update(engine);

  
  rect(ground.position.x, ground.position.y, width * 2, 1);
  

  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();  

  for(var i=0;i<balls.length;i++){
    showCannonballs(balls[i],i);
  }
  cannon.mostrar();
 
}

function keyReleased(){
  if(keyCode == DOWN_ARROW){
    balls[balls.length-1].shoot();
  }
}

function keyPressed(){
  if(keyCode == DOWN_ARROW){
    ball = new CannonBall(cannon.x,cannon.y);
  balls.push(ball);
  }
   

}

function showCannonballs(ball,i){
  if(ball){
    ball.display();
  }
}