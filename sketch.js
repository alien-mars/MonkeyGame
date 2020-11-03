//declare variables
var monkey_running, backImg, gameoverImg, gameOver; 
var obstacleImg, bananaImg;
var foodGroup, obstacleGroup;
var monkey, obstacle, banana, jungle, ground;
var score = 0;
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart_button, restartImg;

function preload() {
  //load all images and animations
 monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  bananaImg = loadImage("banana.png");
  backImg = loadImage("jungle.jpg");
  obstacleImg = loadImage("stone.png");
  restartImg = loadImage("restart.png");
  gameoverImg = loadImage("2980f14a-df38-424d-b969-c0805b25a14a.png");
}

function setup() {
  createCanvas(500, 500);
  
  //create a jungle
  jungle = createSprite(250,250,500,500);
  jungle.addImage(backImg);
  jungle.velocityX = -(2 + score/5);
  
  //create a monkey
  monkey = createSprite(80,435,10,20); 
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.15;
  
  //create a ground
  ground = createSprite(250,495,500,20);
  ground.visible = false;
  
  //create a restart button
  restart_button = createSprite(270,280,20,20);
  restart_button.addImage(restartImg);
  restart_button.scale = 0.5;
  restart_button.visible = false;
  
  //create a sprite for game over
  gameOver = createSprite(270,240,20,20);
  gameOver.addImage(gameoverImg);
  gameOver.visible = false;
  
  //make groups
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  //initialize score to 0
  score = 0;
}

function draw() {
  background(220);
   
  if(gameState === PLAY){
    
   //infinitely scrolling background
   if(jungle.x<0){
    jungle.x = jungle.width/2;
   }
  
   //if space pressed, monkey jumps
   if(keyDown("space") && monkey.y>423){
    monkey.velocityY = -12;
   }
  
   //add gravity
   monkey.velocityY = monkey.velocityY + 0.23;
  
    //increase score if monkey eats a banana
   if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
    score = score + 2;
   }
   
    //if monkey touches a stone, end game
   if(monkey.isTouching(obstacleGroup)){
    gameState = END;
   }  
    
   //spawning bananas and obstacles
   bananas();
   obstacles();
  
   //increase monkey's size according to score
   switch(score){
     case 10 : monkey.scale = 0.17;
      break;
     case 20 : monkey.scale = 0.19;
      break;
     case 30 : monkey.scale = 0.21;
      break;
     case 40 : monkey.scale = 0.23;
      break;
     case 50 : monkey.scale = 0.24;
      break;
     default : break;
   }
    
  }
  
  //when game ends, reset it
  if(gameState === END){
   reset();
  }
  
  monkey.collide(ground);
   
  drawSprites();
  
  //display score
  stroke("black");
  textSize(20);
  fill("black");
  text("Score: " + score,400,50);
  
}

 function bananas(){
   if(frameCount%200===0){
     var banana = createSprite(480,200,20,20);
     banana.addImage(bananaImg);
     banana.scale = 0.15;
     banana.y = Math.round(random(120,200));
     banana.velocityX = -(2 + score/5);
     jungle.velocityX = banana.velocityX;
     banana.lifetime = 300;
     foodGroup.add(banana);
   }
 }

 function obstacles(){
   if(frameCount%300===0){
     var obstacle = createSprite(490,460,20,20);
     obstacle.addImage(obstacleImg);
     obstacle.scale = 0.2;
     obstacle.velocityX = -(2 + score/5);
     obstacle.lifetime = 300;
     //obstacle.debug = true;
     obstacle.setCollider("rectangle",0,0,250,300);
     obstacleGroup.add(obstacle);
   }
 }

function reset(){
  jungle.velocityX = 0;
  foodGroup.destroyEach();
  obstacleGroup.destroyEach();
  restart_button.visible = true;
  gameOver.visible = true;
  monkey.visible = false;
  
  if(mousePressedOver(restart_button)){
     gameState = PLAY;
     jungle.velocityX = -(2 + score/5);
     restart_button.visible = false;
     gameOver.visible = false;  
     monkey.visible = true;
     monkey.scale = 0.15;
     score = 0;
    }
}