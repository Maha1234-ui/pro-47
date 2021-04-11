var bgImg, Bg;
var playerImg, player;
var edges;
var vehicle, amb1Img;
var amb2Img, citybusImg, coinImg, redcarImg,sclbusImg;
var vehicleGroup;
var bluecarImg, bluecar;
var score = 0;
var coin, coinGroup;
var gameState = "play";
var gameoverImg, gameover;

function preload(){
resetImg = loadImage("reset.png");
coinSound = loadSound("coin.mp3");
GOSound = loadSound("gameend.m4a");
hitSound = loadSound("metal.mp3");
goImg = loadImage("gameover.png");
sckImg = loadImage("sck.png")
bgImg = loadImage("8.webp");
gameoverImg = loadImage("gameover.png")
playerImg = loadImage("player.png");  
amb1Img = loadImage("ambulance 1.png");  
citybusImg = loadImage("citybus.png");
coinImg = loadImage("coin.png");
redcarImg = loadImage("red car.png");
sclbusImg = loadImage("scl bus.png");
bluecarImg = loadImage("bluecar.png");
}

function setup(){
createCanvas(1000,800);
  
Bg = createSprite(500,400,800,800);
Bg.addAnimation("moving", bgImg);
Bg.scale = 1.5;
//Bg.velocityY = 2;


player = createSprite(515,670,20,20);
player.addImage(playerImg);
player.scale = 0.4;
player.debug = "true";
player.setCollider("rectangle", 0,0,200,400);

edges = createEdgeSprites();

reset = createSprite(500,500,20,20);
reset.addImage(resetImg);
reset.scale = 0.5
reset.visible = false;

gameover = createSprite(500,200,20,20);
gameover.addImage(gameoverImg);
gameover.visible = false;
gameover.scale = 0.3;

vehicleGroup = new Group();
coinGroup = new Group();








}

function draw(){

if(gameState === "play"){

if(keyDown("RIGHT_ARROW")){
   player.x = player.x+5;

}

if(keyDown("LEFT_ARROW")){
   player.x = player.x-5;

}
if (Bg.x < 0){
   Bg.x = Bg.width/2;
  }

player.bounceOff(edges);

  Coin();
  spawnVehicles();
  if(coinGroup.isTouching(player)){
     score++;
     coinSound.play();
     coinGroup.destroyEach();
  }
  
  if(vehicleGroup.isTouching(player)){
     gameState = "end";
     GOSound.play();


  }
}
 else if(gameState === "end"){
   reset.visible = true
   gameover.visible = true
     background("black");
     vehicleGroup.destroyEach();
     coinGroup.destroyEach();
     Bg.destroy();
     player.destroy();
     
  }
  drawSprites();
  fill("red");
  textSize(25);
  text("Score : "+score,870,100 );

}

function spawnVehicles(){
if(frameCount % 150 === 0){
   vehicle = createSprite(515,400,40,40);
   vehicle.debug = "true";
   vehicle.velocityY = 2;
   vehicle.setCollider("rectangle",0,0,200,200);
   vehicle.x = Math.round(random(200,800));
   var rand = Math.round(random(1,6));
   switch(rand){
      case 1: vehicle.addImage(amb1Img);
      break;
      case 2: vehicle.addImage(sckImg);
      break;
      case 3: vehicle.addImage(citybusImg);
      break;
      case 4: vehicle.addImage(sclbusImg);
      break;
      case 5: vehicle.addImage(redcarImg);
      break;
      case 6: vehicle.addImage(bluecarImg);
      break;
default:break
   }
   vehicle.scale = 0.5
   vehicleGroup.add(vehicle);
   vehicle.lifetime = 200;
}

}

function Coin(){
if(frameCount % 200 === 0){
 coin = createSprite(515,400,40,40);
 coin.velocityY = 2;
 coin.x = Math.round(random(200,750));
 coin.addImage(coinImg);
 coin.scale = 0.1
 coin.lifetime = 200;
 coinGroup.add(coin);

}
}
