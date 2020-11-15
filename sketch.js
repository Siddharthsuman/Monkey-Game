var PLAY=1;
var END=0;
var gameState=PLAY;
var score;
var survivalTime=0;
var monkey , monkey_running,background1,backgroundImage
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var ground,ground2,grassImage;
var gameOver,restart,gameoverImage,restartImage;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 grassImage=loadImage("grass.png");
  backgroundImage=loadImage("nature.jpg");
  restartImage=loadImage("restart.png");
  gameoverImage=loadImage("gameover.png")
}



function setup() {
  createCanvas(600,200);

   background1=createSprite(300,100,600,200);
  background1.addImage("background",backgroundImage);
  background1.scale=1.5;
  background1.velocityX=-3;
  
  monkey=createSprite(30,160,1,1);
  monkey.addAnimation("MRun",monkey_running);
  monkey.scale=0.10;
  monkey.setCollider("rectangle",1,1,monkey.width,monkey.height);
  monkey.debug=false;
  
  ground=createSprite(300,198,800,10);
   ground.x=ground.width/2;
  ground.visible=false;
  console.log(ground.x);
  
  ground2=createSprite(300,185,800,15);
  ground2.addImage(grassImage);
  ground2.scale=1.2;
  
  gameOver=createSprite(250,100,1,1);
  gameOver.addImage(gameoverImage);
  gameOver.scale=0.5;
  
  restart=createSprite(400,100,50,50);
  restart.addImage(restartImage);
  restart.scale=0.5;
 obstaclesGroup= createGroup();
  foodGroup= createGroup();
     score=0;  
}


function draw() {
background(200);
  monkey.collide(ground);
  if (gameState===PLAY){
    
  if (background1.x<210) {
      background1.x=background1.width/2;
  }
  ground.velocityX=-(4+ score/100);
    score = score + Math.round(frameCount/150);
    if (monkey.isTouching(foodGroup)){
      foodGroup.destroyEach();
    }
    
  if (ground.x < 0){
      ground.x = ground.width/2;
    
   
    
    }
    
    
    
  if (keyDown("space")&& monkey.y>=80){
    monkey.velocityY=-14;
 
    
     
  }
    monkey.visible=true;
    background1.visible=true;
    ground2.visible=true;
     //adding gravity
   monkey.velocityY = monkey.velocityY + 1
    if (obstaclesGroup.isTouching(monkey)){
      gameState=END;
    }
    gameOver.visible=false;
    restart.visible=false;
  }
  if(gameState===END){
    ground.velocityY=0;
    background1.visible=false;
    monkey.visible=false;
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.destroyEach();
    foodGroup.setLifetimeEach(-1);
    foodGroup.destroyEach();
    ground2.visible=false;
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
        gameOver.visible=true;
    restart.visible=true;
    if ( mousePressedOver(restart)){
      reset();
    }
  }
  drawSprites();
  spawnObstacle();
  spawnFood();
  //giving score
  fill("blue")
  textSize(20);
  text("Score"+score,10,25)
  //giving survival time
 stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("survivalTime:"+survivalTime,430,25);
}

function spawnObstacle(){
  if (frameCount % 120 === 0){
     var obstacle = createSprite(600,160,10,10);
     obstacle.y = Math.round(random(170,170));
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-(6 + score/100);
    obstacle.scale=0.15;
    //giving lifetime to obstacle
    obstacle.lifetime=200;
    //giving depth to obstacles 
    obstacle.depth = ground2.depth;
   ground2.depth = ground2.depth +1;
   obstaclesGroup.add(obstacle);
  }
}
  function reset(){
  gameState=PLAY
     score=0;
    
   }
 function spawnFood(){
   if (frameCount % 180 === 0){
   var banana=createSprite(600,130,10,10);
   banana.y=Math.round(random(100,110));
   banana.addImage(bananaImage);
   banana.velocityX=-(6+score/100);
     banana.scale=0.06;
   banana.lifetime=200;
     foodGroup.add(banana);
   }
 }




