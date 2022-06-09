class Boat
{
    constructor(x,y,w,h,bposy){
        this.body = Bodies.rectangle(x,y,w,h);
        World.add(world,this.body);
        this.image = loadImage("assets/boat.png");
        this.bposy = bposy;
        this.w = w;
        this.h = h;
    }

    mostrar(){
        var angle = this.body.angle;

        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0,this.bposy, this.w, this.h);
        pop();
        
    }
    remove (i){
        setTimeout(()=>{
            World.remove(world,this.body);
           delete boats[i];
        },500);
       }
}
     