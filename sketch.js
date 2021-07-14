var balloon2
var database
var position

function preload(){
backgroundImage= loadImage("City.png")
balloonImage= loadAnimation("Hot Air Ballon-01.png","Hot Air Ballon-02.png","Hot Air Ballon-03.png")
balloonImage2= loadImage("Hot Air Ballon-01.png")
}
function setup() {
  createCanvas(800,400);
  database= firebase.database();

 
  balloon1= createSprite(100,200,40,40)
  balloon1.addAnimation("balloon",balloonImage)
  balloon1.scale=0.4
  var balloonPosition= database.ref('balloon/position')
  balloonPosition.on("value",readPosition, showError)
}

function draw() {
  background(backgroundImage); 
 

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0)
    balloon.addAnimation("HotAirBalloon" , balloonImage2 )
  } 
 else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0)
    balloon.addAnimation("HotAirBalloon" , balloonImage2 )
  }
 else  if(keyDown(UP_ARROW)){
   updateHeight(0,-10)
   balloon1.addAnimation("balloon",balloonImage2)
   balloon1.scale=balloon1.scale-0.01
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10)
    balloon1.addAnimation("balloon",balloonImage2)
    balloon1.scale=balloon1.scale+0.01
  }
  console.log(balloon1.x)
  console.log(balloon1.y)
  drawSprites();

}
function updateHeight(x,y){
database.ref('balloon/position').set({
  'x': position.x+ x,
  'y': position.y+ y
})
}
function readPosition(data){
  position=data.val();
  balloon1.x = position.x;
  balloon1.y= position.y;
}
function showError(){
  console.log("An error in writing the database")
}