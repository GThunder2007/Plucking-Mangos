const Engine  = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var boy,boyImage;
var tree,treeImage;

var world,engine;

var score = 0;

var gameState = "onSling";


function setup() {
  createCanvas(1200,400);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(500,400,1200,50);
  polygon = new Rock(150,250,40,40);
  slingshot = new Slingshot(polygon.body,{x:150, y:250});

  mango1 = new Mango(750, 140, 15, 15);
  mango2 = new Mango(900, 120, 15, 15);
  mango3 = new Mango(850, 145, 15, 15);

  boy = createSprite(200, 320, 150, 15);
  boyImage = loadImage("images/boy.png");
  boy.scale = 0.1;

  tree = createSprite(800, 200, 150, 15);
  treeImage = loadImage("images/tree.png");
  tree.scale = 0.3;
}

function draw() {
  Engine.update(engine);
  background(200); 
ground.display(); 

slingshot.display();

boy.addImage('binSprite',boyImage)
tree.addImage('binSprite',treeImage)
drawSprites();
polygon.display();
mango1.display();
mango2.display();
mango3.display();

detectcollision(polygon, mango1);
detectcollision(polygon, mango2);
detectcollision(polygon, mango3);
}

function mouseDragged(){
  if(gameState === "onSling"){
  Matter.Body.setPosition(polygon.body, {x: mouseX , y: mouseY});
  }
}


function mouseReleased(){
  slingshot.fly();
  gameState = "launched"
}

function keyPressed(){

  if(keyCode === 32){
  
  slingshot.attach(polygon.body);
  
  }
  
  }

function detectcollision(lstone,lmango){
  mangoBodyPosition=lmango.body.position
  stoneBodyPosition=lstone.body.position

  var distance=dist(stoneBodyPosition.x, stoneBodyPosition.y, mangoBodyPosition.x, mangoBodyPosition.y)
  if(distance<=lmango.r+lstone.r){
    Matter.Body.setStatic(lmango.body, false);
  }
}