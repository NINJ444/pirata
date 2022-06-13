const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon, ball, boat;
var balls=[];
var boats=[];
var boatAnimation = [];
var boatJSON, boatPNG; //spritedata e spritesheet
var quebrado=[]
var quebradojson
var quebradopng

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  boatJSON = loadJSON("assets/boat/boat.json");
  boatPNG = loadImage("assets/boat/boat.png");
  quebradojson = loadJSON("assets/boat/broken_boat.json");
  quebradopng = loadImage("assets/boat/broken_boat.png");
  
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

  //matriz de frames da animação
  var boatFrames = boatJSON.frames;
  for(var i=0; i<boatFrames.length; i++){
    var pos = boatFrames[i].position;
    var img = boatPNG.get(pos.x,pos.y,pos.w,pos.h);
    boatAnimation.push(img);
  }
  var quebradoFrames = quebradojson.frames;
  for(var i=0; i<quebradoFrames.length; i++){
    var pos = quebradoFrames[i].position;
    var img = quebradopng.get(pos.x,pos.y,pos.w,pos.h);
    quebrado.push(img);
  }

 

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
    collisionWithBoat(i);
  }

  cannon.mostrar();
  showBoats();
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
  if(ball.body.position.x>width||ball.body.position.y>height-50){
  ball.remove(i);  
  }
  }
}

function showBoats(){
  if(boats.length>0){
   if(boats[boats.length-1]==undefined||boats[boats.length-1].body.position.x<width-300 ){
     var positions=[-60,-70,-40,-50]
     var position=random(positions);
     boat = new Boat(width-80, height-60,170,170,position, boatAnimation);
     boats.push (boat);
    
   }
   for(i=0;i<boats.length;i++){
     if(boats[i]){
      Matter.Body.setVelocity(boats[i].body,{
        x: -1,
        y:0  ,
      });
      boats[i].mostrar();
      boats[i].animacao();
     }
   }
  }else{
    boat = new Boat(width-80, height-60,170,170,-80, boatAnimation);
    boats.push (boat);
  }
}

function collisionWithBoat(index){
  for (var i=0; i<boats.length; i++){
    if(balls[index] != undefined && boats[i] != undefined){
      var collision = Matter.SAT.collides(balls[index].body, boats[i].body);
      if(collision.collided){
        //chamada das funções
        boats[i].remove(i);

        //balls[index].remove(index);
        World.remove(world,balls[index].body);
        delete balls[index];



      }
    }
  }
}