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
        this.animation = [this.image];
        this.isSink = false; //indica se a bola afundou
        this.speed = 0.05;
    }

    animacao(){
        this.speed += 0.05;
    }

    display(){
        var angle = this.body.angle;
        var pos = this.body.position;
        var index = floor(this.speed % this.animation.length);
        push();
        translate(pos.x,pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.animation[index],0,0,this.r, this.r);
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
        this.isSink = true;
        Matter.Body.setVelocity(this.body, {x:0,y:0});
        this.animation = waterSplash;
        this.speed = 0.05;
        this.r = 100;
        setTimeout(() => {
            World.remove(world, this.body);
            delete balls[index];
        },500); //tempo em milissegundos
    }
}