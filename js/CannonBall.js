class CannonBall
{
    constructor(x,y){
        this.r = 20;
        var options = {
            isStatic: true,
        };
        this.body = Bodies.circle(x,y,this.r,options);
        World.add(world,this.body);
        this.image = loadImage("assets/cannonball.png");
        this.trajectory = [];
    }

    display(){
        var pos = this.body.position;
        push();
        imageMode(CENTER);
        image(this.image,pos.x,pos.y,this.r, this.r);
        pop();

        if(this.body.velocity.x > 0 && pos.x > 200){
            var position = [pos.x,pos.y];
            //i               0     1
            this.trajectory.push(position);
        }

        for(var i=0; i< this.trajectory.length; i++){
            image(this.image, this.trajectory[i][0], this.trajectory[i][1],5,5);
        }

    }

    shoot(){
        var newAngle = cannon.angle - 28;
        newAngle = newAngle*(3.14/180); //conversão de graus para radianos
        var velocity = p5.Vector.fromAngle(newAngle);
        velocity.mult(0.5);
        Matter.Body.setStatic(this.body, false);
        Matter.Body.setVelocity(this.body, {
            x:velocity.x * (180/3.14),
            y:velocity.y * (180/3.14)});
    }

    remove(index){
        Matter.Body.setVelocity(this.body, {x:0,y:0});
        setTimeout(() => {
            World.remove(world, this.body);
            delete balls[index];
        },500); //tempo em milissegundos
    }
}