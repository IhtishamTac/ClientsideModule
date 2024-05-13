const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const btnPlay = document.getElementById("btnPlay");
const inputName = document.getElementById("inputName");
const wrap = document.getElementById("wrap");
const mainMenu = document.getElementById("mainMenu");
const score = document.getElementById("score");

let playerName = "";

btnPlay.addEventListener("click", (e) => {
  playerName = inputName.value;
  wrap.style.opacity = "1";
  mainMenu.style.display = "none";
  canvas.style.cursor = "none";
  setInterval(() => {
    spawnbird();
    spawnEnemy();
  }, 3000);
  main();
});

let bottomBorder = 400;

let crossHairX = 0;
let crossHairY = 0;
let crossHairWid = 50;
let crossHairHei = 50;

let spawnpoint1X = 80;
let spawnpoint1Y = 315;

let spawnpoint2X = 910;
let spawnpoint2Y = 315;

let spawnpoint3X = 700;
let spawnpoint3Y = 130;

let spawnpoint4X = 200;
let spawnpoint4Y = 130;

let playerIsShoot = false;

let playerScore = 0;

let enemyCanBeHit = false;

let timer = 30;

const shooter = new Image();
shooter.src = "asset/weapon.png";
const crossHair = new Image();
crossHair.src = "asset/croshair.png";
const three = new Image();
three.src = "asset/three.png";
const rock = new Image();
rock.src = "asset/rock.png";

const enemyImg = new Image();
enemyImg.src = "asset/werewolf.png";
const birdImg = new Image();
birdImg.src = "asset/pngegg.png";
const birdLImg = new Image();
birdLImg.src = "asset/pngegg-l.png";
const deadBird = new Image();
deadBird.src = "asset/dead-bird.png";

let mL = window.getComputedStyle(canvas, null).getPropertyValue("margin-left");
mL = mL.substr(0, mL.length - 2);

function main() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  score.textContent = playerScore;
  updateEnemy();
  updateBirds();
  drawTerrain();
  ctx.drawImage(shooter, 700, 300, 300, 300);
  ctx.drawImage(
    crossHair,
    crossHairX - mL - crossHairWid / 2,
    crossHairY - crossHairHei / 2,
    crossHairWid,
    crossHairHei
  );
  requestAnimationFrame(main);
}

function playerShootEnemy(e) {
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    if (
      e.clientX - mL < enemy.x + enemy.width &&
      e.clientX - mL + 50 > enemy.x &&
      e.clientY < enemy.y + enemy.height &&
      e.clientY + 50 > enemy.y
    ) {
      enemies.splice(i, 1);
      playerScore += enemy.point;
    }
  }
}

function playerShootBirds(e) {
  for (let b = 0; b < birds.length; b++) {
    const bird = birds[b];
    if (
      e.clientX - mL < bird.x + bird.width &&
      e.clientX - mL + 50 > bird.x &&
      e.clientY < bird.y + bird.height &&
      e.clientY + 50 > bird.y
    ) {
      playerScore += bird.point;
      bird.img = deadBird;
      bird.vx = 0;
      bird.vy = 2;
    }
  }
}

addEventListener("mousedown", (e) => {
  if (e.button === 0) {
    playerShootEnemy(e);
    playerShootBirds(e);
  }
});

function insertToLocalstorage() {
    let storageArray = [];
    storageArray[playerName] = playerScore;
    
}

function drawTerrain() {
  ctx.drawImage(three, -110, -200, 750, 500);
  ctx.drawImage(three, -230, -30, 750, 500);
  ctx.drawImage(rock, 700, 60, 250, 300);
  ctx.drawImage(three, 600, -30, 750, 500);
}

addEventListener("mousemove", (e) => {
  crossHairX = e.clientX;
  crossHairY = e.clientY;
});
