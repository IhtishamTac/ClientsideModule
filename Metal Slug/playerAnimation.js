function playerAnim() {
  if (playerObj.hp >= 3) {
    ctx.drawImage(heart, 140, 20, 100, 55);
  }
  if (playerObj.hp >= 2) {
    ctx.drawImage(heart, 70, 20, 100, 55);
  }
  if (playerObj.hp >= 1) {
    ctx.drawImage(heart, 0, 20, 100, 55);
  }
  //player face
  if (!playerFacingLeft && !playerFacingRight) {
    ctx.drawImage(player1Right, p1X, p1Y, 120, 120);
  }
  if (playerFacingRight) {
    ctx.drawImage(player1Right, p1X, p1Y, 120, 120);
  } else if (playerFacingLeft) {
    ctx.drawImage(player1Left, p1X, p1Y, 120, 120);
  }
}
