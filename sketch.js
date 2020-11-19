var ground, groundImg, invisibleGround, invisibleGroundsGroup;
var door , doorImg, doorsGroup;
var flower, flowerImg, flowersGroup;
var ghost, ghostImg;
var gameState = PLAY;
var PLAY = 1;
var END = 0;

function preload(){
  
  groundImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  flowerImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
}

function setup(){
  
  createCanvas(600,600);
  
  ground = createSprite(300,300,10,20);
  ground.addImage(groundImg);
  ground.velocityY = 3;
  
  ghost = createSprite(300,300,20,20);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  
  doorsGroup = new Group();
  flowersGroup = new Group();
  invisibleGroundsGroup = new Group();
}


function draw(){
  
  background(180);
  
  
  if(ground.y>600){
  ground.y = 300;
  }
  
  spawnDoor();
 
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  
  ghost.velocityY = ghost.velocityY + 0.2;
  
  ghost.collide(invisibleGroundsGroup);
  
  if(keyDown("right_arrow")){
    ghost.velocityX = 2;
  }
  
  if(keyDown("left_arrow")){
    ghost.velocityX = -2;
  }
  
  drawSprites();

  if(flowersGroup.isTouching(ghost)){
    background(0);
    textSize(30);
    fill("yellow");
    stroke("yellow");
    text("Game Over",250,300);

    
  }
}

function spawnDoor(){
  
  if(frameCount % 200 === 0){
    door = createSprite(200,-50,10,10);
    door.addImage(doorImg);
    door.velocityY = 3;
    door.x = (random(100,500));
    doorsGroup.add(door);
    
    flower = createSprite(200,-1,10,10);
    flower.addImage(flowerImg);
    flower.velocityY = 3;
    flower.x = door.x;       
    flowersGroup.add(flower);
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
    
    ghost.depth = flower.depth;
    ghost.depth = ghost.depth + 1;
    
    invisibleGround = createSprite(550,-30,50,10);
    invisibleGround.velocityY = 3;
    invisibleGround.x = door.x;
    invisibleGroundsGroup.add(invisibleGround);
    invisibleGround.visible = false;
  }
}

