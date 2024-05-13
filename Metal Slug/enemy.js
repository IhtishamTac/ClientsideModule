let enemies = [];

class Enemy {
  constructor(x, y, velocityX, img) {
    this.x = x;
    this.y = y;
    this.velocityX = velocityX;
    this.img = img;
    this.width = 100;
    this.height = 100;
    this.hp = 100;
    this.score = 250;
  }
  update() {
    this.x += this.velocityX;
  }
  draw(ctx) {
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText(this.hp, this.x + 45, this.y - 10);
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  isOffScreen(canvasWidth) {
    return this.x < 0 || this.x > canvasWidth;
  }
}

function spawnEnemy() {
  let spawnLocation = ["left", "right"];
  const spawnIndex = Math.floor(Math.random() * spawnLocation.length);

  //   console.log(spawnIndex);
  if (spawnIndex == 0) {
    enemies.push(new Enemy(enemyXL, enemyY, enemyVelocity, enemyRight));
  } else if (spawnIndex == 1) {
    enemies.push(new Enemy(enemyX, enemyY, -enemyVelocity, enemyLeft));
  }
}

function updateAndDrawEnemies() {
  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];
    enemy.update();
    enemy.draw(ctx);
    if (enemy.isOffScreen(canvas.width)) {
      enemies.splice(i, 1);
      i--;
    }
  }
}
