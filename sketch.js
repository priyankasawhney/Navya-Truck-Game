var playerimg, player;
var logo, logoimg;
var restart, restartimg;
var start, startimg;
var gameover, gameoverimg;
var bg1, bg1img;
var bomb, bombimg;
var hurdles, hurdlesimg;
var landMonster, landMonsterimg;
var redspikes, redspikesimg;
var skeleton, skeletonimg;
var snail, snailimg;
var snake, snakeimg;
var spikeRoller,spikeRollerimg;
var ground;
var obstacle,obstaclegrp;
var score;
var gameState=PLAY;
var PLAY=1;
var END=0; 

function preload (){
playerimg=loadImage("player1A.png");
logoimg=loadImage("logo1.png");
restartimg=loadImage("restart.png");
startimg=loadImage("start.png");
gameoverimg=loadImage("gameover.png")
bg1img=loadImage("bg2.jpg");
bombimg=loadImage("bomb.png");
hurdlesimg=loadImage("hurdles.png");
landMonster=loadImage("landMonster.png");
redspikes=loadImage("redspikes.png");
snakeimg=loadImage("snake.png");
}

function setup(){
createCanvas(windowWidth,windowHeight);
bg=createSprite(0,0,windowWidth,windowHeight); 
bg.addImage (bg1img);
//bg.x=bg.width/2;
bg.velocityX=-12;
bg.scale=2.3;

player=createSprite(100,450,100,60);
player.addImage(playerimg);
player.scale=0.5;
player.setCollider("rectangle",0,0,280,300,0);
player.debug=true;

ground=createSprite(width/2,460,windowWidth,10);
ground.visible=false;

logo=createSprite(windowWidth/2,windowHeight/2-100,80,80);
logo.addImage(logoimg);
logo.scale=1.4;

start=createSprite(windowWidth/2,windowHeight/2+150,80,80);
start.addImage(startimg);
start.scale=1.1;


gameover=createSprite(windowWidth/2,windowHeight/2-100,80,80);
gameover.addImage(gameoverimg);
gameover.scale=1.4;

restart=createSprite(windowWidth/2,windowHeight/2+90,80,80);
restart.addImage(restartimg);
restart.scale=0.3;

restart.visible=false;
gameover.visible=false;


obstaclegrp= new Group();
score=0;
 }

function draw(){


if (mousePressedOver(start)){
    gameState=PLAY;
    start.visible=false;
    logo.visible=false;
    player.velocityY=-20
}

if (gameState===PLAY){
bg.velocityX=-12;
score=score+Math.round(getFrameRate()/60);

if(bg.x<0)
{
 bg.x=bg.width/2;
}

if(touches.length>0||keyDown("space")|| player.y>=420){
    player.velocityY=-30;
    touches=[];
}
player.velocityY=player.velocityY+2;

if(obstaclegrp.isTouching(player)){
   gameState=END;
}

obstacle();
}

else if(gameState===END)
{
    player.x=100;
    player.y=450;
    gameover.visible=true;
    restart.visible=true;
    player.velocityX=0;
    player.velocityY=0;
    ground.velocityX=0;
    bg.velocityX=0;
    obstaclegrp.setVelocityXEach(0);
    obstaclegrp.setVelocityYEach(0);
    obstaclegrp.destroyEach();
}

if(touches.length>0||mousePressedOver(restart)){
    reset();
    touches=[];
}

player.collide(ground);
drawSprites();

textSize(25);
fill("red");
text("SCORE: "+score,windowWidth-220,40);

}

function reset (){
    gameState=PLAY;
    gameover.visible=false;
    restart.visible=false;
    score=0;
    player.x=100;
    player.y=450;
}


function obstacle(){
    if(frameCount%100===0){
        var obs=createSprite(1100,400,50,70);
        obs.velocityX=-12;
        rand=Math.round(random(1,5));
        switch (rand){
            case 1: obs.addImage(bombimg);
            obs.scale=0.5;
            break;

            case 2: obs.addImage(hurdlesimg);
            obs.scale=0.5;
            break;

            case 3: obs.addImage(landMonster);
            obs.scale=0.5;
            break;

            case 4: obs.addImage(redSpikes);
            obs.scale=0.5;
            break;

            case 5: obs.addImage(snakeimg);
            obs.scale=0.5;
            break;
default: break;
        }
obstaclegrp.add(obs);
    }
}
