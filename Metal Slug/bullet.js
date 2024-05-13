let bullets = [];

class Bullet {
  constructor(x, y, velocityX, img) {
    this.x = x;
    this.y = y;
    this.velocityX = velocityX;
    this.img = img;
  }
  update() {
    this.x += this.velocityX;
  }
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, 50, 50);
  }
  isOffScreen(canvasWidth) {
    return this.x < 0 || this.x > canvasWidth;
  }
}

let lastBulletTime = 0; // Timestamp of the last bullet fired
let bulletCooldown = 200; // Cooldown time in milliseconds (adjust as needed)

function shootBullet() {
  const currentTime = Date.now();

  if (shootPress && (currentTime - lastBulletTime >= bulletCooldown)) {
    let bulletImg, velocity;
    lastBulletTime = currentTime;

    if (playerFacingRight) {
      bulletImg = bulletRight; // Use right-facing bullet image
      velocity = 15; // Set bullet speed to the right
      bullets.push(new Bullet(p1X + 90, p1Y + 35, velocity, bulletImg));
    } else if (playerFacingLeft) {
      bulletImg = bulletLeft; // Use left-facing bullet image
      velocity = -15; // Set bullet speed to the left
      bullets.push(new Bullet(p1X - 20, p1Y + 35, velocity, bulletImg));
    }
  }
}

function updateAndDrawBullets() {
  // Loop through each bullet in the array
  for (let i = 0; i < bullets.length; i++) {
    let bullet = bullets[i];

    // Update bullet position
    bullet.update();

    // Draw bullet
    bullet.draw(ctx);

    // Check if bullet is off-screen
    if (bullet.isOffScreen(canvas.width)) {
      // Remove bullet if it's off-screen
      bullets.splice(i, 1);
      i--; // Adjust index because the array is now shorter
    }
  }
}
