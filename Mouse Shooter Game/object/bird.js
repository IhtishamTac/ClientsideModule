let birds = [];
class Bird {
  constructor(x, y, birdVX, birdVY,img) {
    this.x = x;
    this.y = y;
    this.vx = birdVX;
    this.vy = birdVY;
    this.img = img;
    this.width = 150;
    this.height = 100;
    this.point = 50;
  }
  update() {
    this.x += this.vx;
    // if(this.x > 600){
    //     this.vx = -2;
    // }
    this.y += this.vy;
  }
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

function spawnbird() {
  const randomIndex = Math.floor(Math.random() * 2);
  console.log(randomIndex);
  if (randomIndex === 0) {
    birds.push(new Bird(-20, 10, 2,0, birdImg));
  } else {
    birds.push(new Bird(1000, 10, -2,0, birdLImg));
  }
}

function updateBirds() {
  for (let b = 0; b < birds.length; b++) {
    const bird = birds[b];
    bird.draw(ctx);
    bird.update();
    if(bird.y > 400){
        birds.splice(b,1);
    }
  }
}
