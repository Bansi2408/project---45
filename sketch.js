var name = "minu";

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy, boy_running;
var ground, invisibleGround, groundImage;

var obstaclesGroup, obstacle1 , obstacle;

var score;

var gameOverImg,restartImg;
var jumpSound , checkPointSound, dieSound;


function preload(){
  boy_running = loadImage("boy running.gif");
  
  groundImage = loadImage("ground2.png");
  
  obstacle1 = loadImage("stoneImage.png") 
  
  restartImg = loadImage("restartImage.png");
  gameOverImg = loadImage("gameOverImage.png");
  
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(600, 200);
  
  name = "BMS";
  
  
  boy = createSprite(50,180,20,50);
  boy.addAnimation("running", boy_running);
  boy.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
 
  score = 0;
  
}

function draw() {
  
  background("white");
  console.log(name)
  //displaying score
  text("Score: "+ score, 500,50);
  
 
  
  
  if(gameState === PLAY){
    gameOver.visible = false
    restart.visible = false
    //move the ground
    ground.velocityX = -(4+3*+score/100);
    //scoring
    score = score + Math.round(getFrameRate()/60);
    if(score%100==0 && score>0  )
       {
           checkPointSound.play();
       }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& trex.y >= 160) {
        trex.velocityY = -12;
        jumpSound.play();
    }
   
    console.log(boy.y)
    
    //add gravity
    boy.velocityY = boy.velocityY + 0.8
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(boy)){
       gameState = END;
       dieSound.play();
       //boy.velocityY=-12;
       //jumpSound.play();
    }
  }
   else if (gameState === END) {
  
      gameOver.visible = true;
      restart.visible = true;
     
      ground.velocityX = 0;
      trex.velocityY = 0
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     
     if(mousePressedOver(restart)) {
        reset();
        }
   }
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -(6+score/100);
   
   
    //generate random obstacles
    obstacle.addImage(obstacle1);

   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.05;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function reset() 
{
  gameState = PLAY;
  score = 0;
  boy.changeAnimation("running", boy_running);
  obstaclesGroup.destroyEach();
  gameOver.visible = false;
  restart.visible = false;
}



