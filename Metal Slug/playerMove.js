let pV = 5;
let pJVY = 13;

addEventListener('keydown', (e)=>{
    if(e.code == 'KeyA') {
        p1VXL = -pV;
        playerFacingRight = false;
        playerFacingLeft = true;
    };
    if(e.code == 'KeyD') {
        p1VXR = pV;
        playerFacingLeft = false;
        playerFacingRight = true;
    };
    if(e.code == 'Space') {
        shootPress = true;
    };
    if(e.code == 'KeyW'){
       if(playerGrounded){
        p1VY = -pJVY;
        playerGrounded = false;
       }
    }
});

addEventListener('keyup', (e)=>{
    if(e.code == 'KeyA') p1VXL += pV;
    if(e.code == 'KeyD') p1VXR -= pV;
    if(e.code == 'Space') shootPress = false;
});