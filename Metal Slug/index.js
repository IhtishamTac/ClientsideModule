const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const playGame = document.getElementById("playGame");
const mainMenu = document.getElementById("mainMenu");
const highscore = document.getElementById("highscore");

let enemySpawnInterval = "";
playGame.onclick = () => {
  mainMenu.style.display = "none";
  canvas.style.display = "block";

  // enemySpawnInterval = setInterval(() => {
  //   spawnEnemy();
  // }, 3000);
};

const player1Right = new Image();
player1Right.src = "asset/aseprites/marcos.png";
const player1Left = new Image();
player1Left.src = "asset/aseprites/marcos-left.png";
const bulletLeft = new Image();
bulletLeft.src = "asset/aseprites/bullet-left.png";
const bulletRight = new Image();
bulletRight.src = "asset/aseprites/bullet.png";
const enemyLeft = new Image();
enemyLeft.src = "asset/aseprites/alien-left.png";
const enemyRight = new Image();
enemyRight.src = "asset/aseprites/alien.webp";
const heart = new Image();
heart.src = "asset/aseprites/heart.png";

const crossHair = new Image();
crossHair.src = "asset/croshair.png";

//player1
let p1X = 490;
let p1Y = 565;
let p1VXR = 0;
let p1VXL = 0;
let p1VY = 0;

let playerHitOnce = false;
let playerScore = 0;

let gameOverStatus = false;

const playerObj = {
  x: p1X,
  y: p1Y,
  width: 100,
  height: 100,
  hp: 3,
};

//bullets
let bX = p1X;
let bY = p1Y;
let bVXR = 0;
let bVXL = 0;

//enemy position
let enemyXL = 0;
let enemyX = 1000;
let enemyY = 565;

let enemyVelocity = 3;

let playerFacingRight = false;
let playerFacingLeft = false;

const bottomBorder = 565;

let shootPress = false;

let playerGrounded = false;

function main() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  p1X += p1VXR;
  p1X += p1VXL;
  p1Y += p1VY;

  colideBorder();
  playerAnim();
  if (shootPress) {
    shootBullet();
  }
  if (playerObj.hp <= 0) {
    if (!gameOverStatus) {
      gameOver();
      gameOverStatus = true;
    }
  }
  bulletHitEnemy();
  enemyHitPlayer();
  updateAndDrawEnemies();
  updateAndDrawBullets();
  
  requestAnimationFrame(main);
}

function colideBorder() {
  if (p1Y >= bottomBorder) {
    p1Y = bottomBorder;
    playerGrounded = true;
  }
}

function bulletHitEnemy() {
  for (let i = 0; i < bullets.length; i++) {
    let bullet = bullets[i];

    for (let j = 0; j < enemies.length; j++) {
      let enemy = enemies[j];

      if (
        bullet.x < enemy.x + enemy.width &&
        bullet.x + 50 > enemy.x &&
        bullet.y < enemy.y + enemy.height &&
        bullet.y + 50 > enemy.y
      ) {
        enemy.hp -= 25;
        if (enemy.hp <= 0) {
          enemies.splice(j, 1);
          j--;
          playerScore += enemy.score;
          console.log(playerScore);
        }

        bullets.splice(i, 1);

        i--;
        break;
      }
    }
  }
}

function enemyHitPlayer() {
  for (let en = 0; en < enemies.length; en++) {
    let enemy = enemies[en];
    if (enemy.x < playerObj.x + playerObj.width && enemy.x + 50 > playerObj.x) {
      if (playerHitOnce == false) {
        playerObj.hp -= 1;
        playerHitOnce = true;
        console.log(playerObj.hp);
        setTimeout(() => {
          playerHitOnce = false;
        }, 3000);
      }
    }
  }
}

function pushScoreToStorage() {
  if (playerScore == 0) {
    return;
  }
  let storageArray;
  let jsonScore = localStorage.getItem("score");
  if (jsonScore) {
    storageArray = JSON.parse(jsonScore);
  } else {
    storageArray = [];
  }
  storageArray.push(playerScore);
  const updateJsonScore = JSON.stringify(storageArray);
  localStorage.setItem("score", updateJsonScore);
}

function displayHighScore() {
  const scores = localStorage.getItem("score");
  const parsedScore = JSON.parse(scores);
  highscore.innerHTML = "";
  if (scores) {
    parsedScore.sort((a, b) => b - a);
    parsedScore.forEach((item, index) => {
      const itemElement = document.createElement("p");

      itemElement.textContent = `Rank ${index + 1}: ${item}`;

      highscore.appendChild(itemElement);
    });
  }
}

function gameOver() {
  // for (let enm = 0; enm < enemies.length; enm++) {
  //   const enemy = enemies[enm];
  // }
  clearInterval(enemySpawnInterval);
  console.log("gameover");
  alert("gameover");
  mainMenu.style.display = "block";
  canvas.style.display = "none";
  playerObj.hp += 3;
  enemies = [];
  bullets = [];
  p1X = 490;
  p1VXL = 0;
  p1VXR = 0;
  p1VY = 0;
  pushScoreToStorage();
  displayHighScore();
}

setInterval(() => {
  if (playerGrounded == false) {
    p1VY += 0.3;
  }
});

main();
displayHighScore();
