let enemies = [];

class Enemy {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 150;
    this.vx = 10;
    this.img = img;
    this.point = 100;
  }
  update() {
    
  }
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

function spawnEnemy() {
  if (enemies.length < 3) {
    const spawnPointIndex = Math.floor(Math.random() * 4);
    switch (spawnPointIndex) {
      case 0:
        enemies.push(new Enemy(spawnpoint1X, spawnpoint1Y, enemyImg));
        break;
      case 1:
        enemies.push(new Enemy(spawnpoint2X, spawnpoint2Y, enemyImg));
        break;
      case 2:
        enemies.push(new Enemy(spawnpoint3X, spawnpoint3Y, enemyImg));
        break;
      case 3:
        enemies.push(new Enemy(spawnpoint4X, spawnpoint4Y, enemyImg));
        break;
      default:
        console.log("not sppawn en");
        break;
    }
  }
}

function updateEnemy() {
  for (let i = 0; i < enemies.length; i++) {
    const en = enemies[i];
    en.draw(ctx);
    en.update();
  }
}
