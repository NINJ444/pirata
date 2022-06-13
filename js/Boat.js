class Boat
{
    constructor(x,y,w,h,bposy,boatAnimation){
        this.body = Bodies.rectangle(x,y,w,h);
        World.add(world,this.body);
        //this.image = loadImage("assets/boat.png");
        this.animation = boatAnimation;
        this.bposy = bposy;
        this.w = w;
        this.h = h;
        this.speed = 0.05;
    }

    animacao(){
        this.speed += 0.05;
    }

    mostrar(){
        var angle = this.body.angle;
        var index = floor(this.speed % this.animation.length);

        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.animation[index], 0,this.bposy, this.w, this.h);
        pop();
        
    }
    remove (i){
     //trocar animacao
        setTimeout(()=>{
            World.remove(world,this.body);
           delete boats[i];
        },500);
       }
}    