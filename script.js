window.onload = init;

var gameWidth = 900;
var gameHeight = 500;

//background
var map = document.getElementById("map");
var ctxMap = map.getContext("2d");
map.width = gameWidth;
map.height = gameHeight;

//player
var pl = document.getElementById("player");
var ctxPlayer = pl.getContext("2d");
pl.width = gameWidth;
pl.height = gameHeight;

//enemy
var en = document.getElementById("enemy");
var ctxEnemy = en.getContext("2d");
en.width = gameWidth;
en.height = gameHeight;
//coin
var con = document.getElementById("coin");
var ctxCoin = con.getContext("2d");
con.width = gameWidth;
con.height = gameHeight;

//stats
var stats = document.getElementById("stats");
var ctxStats = stats.getContext("2d");
stats.width= gameWidth;
stats.height= gameHeight;
ctxStats.fillStyle = "#fff";
ctxStats.font = "bold 10pt Arial";

var money = document.getElementById("money");
var ctxMoney = money.getContext("2d");
money.width= gameWidth;
money.height= gameHeight;
ctxMoney.fillStyle = "#fff";
ctxMoney.font = "bold 10pt Arial";

//creat file Image background
var background = new Image();
background.src = "images/fon.jpg";

//creat file Image player
var im = new Image();
im.src = "images/1.png";


var player = new Player();
var enemies = [];
var coins = [];

var spawnInterval;
var spawnTime = 7000;
var spawnCount = 5;

var spawnIntervalCoin;
var spawnTimeCoin = 10000;
var spawnCountCoin = 1;

var health;
var money=0;


//отвечает за обновленние переменных
var requestAnimFrame = window.requestAnimationFrame||
                       window.webkitRequestAnimationFrame||
                       window.mozRequestAnimationFrame||
                       window.oRequestAnimationFrame||
                       window.msRequestAnimationFrame;

function init(){

 drawBg();
 startLoop();
 document.addEventListener("keydown", checkKeyDown, false);
 document.addEventListener("keyup", checkKeyUp, false);
 resetHealth();
}
function resetHealth(){
  health = 100;
}

function startCreatingEnemies(){
stopCreatingEnemies();
spawnInterval = setInterval(function(){spawnEnemy(spawnCount)},spawnTime);
}
function stopCreatingEnemies(){
  clearInterval(setInterval);
}
function startCreatingCoins(){
stopCreatingCoins();
spawnIntervalCoin = setInterval(function(){spawnCoin(spawnCountCoin)},spawnTimeCoin);
}
function stopCreatingCoins(){
  clearInterval(setInterval);
}
//цикл петля
function loop(){

 if(isPlaying=true){
  draw();
	update();
	requestAnimFrame(loop);//???????????
}
}
function startLoop(){
 isPlaying = true;
 loop();
 startCreatingEnemies();
 startCreatingCoins();
}
function stopLoop(){
 isPlaying = false;
}

function update(){
  player.update();
	updateStats();
  updateMoney();
	for(var i=0; i<enemies.length; i++){
	enemies[i].update();
}
  for(var j=0;j<coins.length;j++){
  coins[j].update();
  CollisionEnemy();
}
}

function drawBg(){
   ctxMap.drawImage(background,0,0,900,500,0,0, gameWidth, gameHeight);
 }


function draw(){
    player.draw();//вызывает метод draw у обьекта player
    clearCtxEnemy();
    for(var i=0;i<enemies.length;i++){
	  enemies[i].draw();
}

  clearCtxCoin();
 for(var j=0;j<coins.length;j++){
  coins[j].draw();
}
}
function spawnEnemy(count){
 for(var i=0; i<count;i++){
    enemies[i] = new Enemy();
  }
}
function spawnCoin(count){
  for(var j=0;j<count;j++){
    coins[j] = new Coin();
  }
}
function Coin(){
  this.srcX = 0;//where picture
  this.srcY = 290;//where picture
  this.drawX = Math.floor(Math.random()*gameWidth);
  this.drawY = Math.floor(Math.random()*gameHeight)-400;//где появляеться
  this.width =160;//ширина рисунка
  this.height =160;//высота рисунка
  this.speed = 1;
}
Coin.prototype.draw = function(){

  ctxCoin.drawImage(im,this.srcX, this.srcY,this.width,this.height,
    this.drawX,this.drawY, this.width , this.height);
}

Coin.prototype.update =function(){

  this.drawY +=1;
}
function Enemy(){
  this.srcX = 0;//where picture
  this.srcY = 130;//where picture
  this.drawX = Math.floor(Math.random()*gameWidth);
  this.drawY = Math.floor(Math.random()*gameHeight)-300;//где появляеться
  this.width =160;//ширина рисунка
  this.height =160;//высота рисунка
  this.speed = 1;
  }
Enemy.prototype.draw = function(){

	ctxEnemy.drawImage(im,this.srcX, this.srcY,this.width,this.height,
		this.drawX,this.drawY, this.width /2, this.height/2);
}
Enemy.prototype.update =function()
{
  this.drawY +=2;
}

//создаем обьект игрок. Обращение к прототипу
function Player(){
	this.srcX = 0;
	this.srcY = 0;
	this.drawX =0;
	this.drawY = 370;
	this.width = 133;
  this.height = 130;
    //keys
    this.isUp = false;
    this.isDown = false;
    this.isLeft = false;
    this.isRight = false;
    this.speed = 5;
}

Player.prototype.chooseDir = function()//направление
{
  if(this.isUp){
    this.drawY+=this.speed;
  }
   if(this.isDown){
    this.drawY-=this.speed;
  }
   if(this.isRight){
    this.drawX+=this.speed;
  }
   if(this.isLeft){
    this.drawX-=this.speed;
  }
}
function checkKeyDown(e)//управленте
{
  var keyID = e.keyCode||e.width;


  if (keyID==40) {
  player.isUp = true;
    e.preventDefault();
  }
  if (keyID==38) {
  player.isDown = true;
    e.preventDefault();
  }
  if (keyID==37) {
  player.isLeft = true;
    e.preventDefault();
  }
  if (keyID==39) {
  player.isRight = true;
    e.preventDefault();
  }
}

function checkKeyUp(e)//управление
{
  var keyID = e.keyCode||e.width;
  if (keyID==40) {
  player.isUp = false;
    e.preventDefault();
  }
  if (keyID==38) {
  player.isDown = false;
    e.preventDefault();
  }
  if (keyID==37) {
  player.isLeft = false;
    e.preventDefault();
  }
  if (keyID==39) {
  player.isRight = false;
    e.preventDefault();
  }
}

//добавляем конструктору Player новое свойство draw(созд.автоматитически)
Player.prototype.draw = function(){

  ctxPlayer.clearRect(0,0,gameWidth,gameHeight);//удаляет предыдущие кадры
  ctxPlayer.drawImage(im, this.srcX,this.srcY,this.width,
  	this.height,this.drawX,this.drawY, this.width, this.height);
}
//что происходит при обновлении с игроком
Player.prototype.update = function(){//прототип обьекта.
  if(this.drawX >= gameWidth/2){
		this.srcX = 135;
	}
  if(this.drawX <=gameWidth/2){
		this.srcX = 0;
	}

  if(this.drawX < 0)this.drawX = 0;
  if(this.drawX > gameWidth-this.width)this.drawX = gameWidth-this.width;
  if(this.drawY < 0)this.drawY = 0;
  if(this.drawY > gameHeight-this.height)this.drawX = gameHeight-this.height;
  for (var i=0; i < enemies.length ; i++) {
     if(this.drawX>= enemies[i].drawX&&
      this.drawY>= enemies[i].drawY&&
      this.drawX<=enemies[i].drawX+enemies[i].width&&
      this.drawY<=enemies[i].drawY+enemies[i].height){
      health--;
     }
   }
   if (health< 0 )alert("Game Over");
  if(money=100)resetHealth();
  money=0;
  this.chooseDir();
for (var i=0; i < coins.length ; i++) {
     if(this.drawX>= coins[i].drawX&&
      this.drawY>= coins[i].drawY&&
      this.drawX<=coins[i].drawX+coins[i].width&&
      this.drawY<=coins[i].drawY+coins[i].height){
      money++;
     }
   }
}
function clearCtxEnemy()
{
  ctxEnemy.clearRect(0,0,gameWidth,gameHeight);

}
function clearCtxCoin()
{
  ctxCoin.clearRect(0,0,gameWidth,gameHeight);

}
function updateStats(){
   ctxStats.clearRect(0,0,gameWidth,gameHeight);
    ctxStats.fillText("Health"+ ": "+health,10,20)
}
function updateMoney(){
   ctxMoney.clearRect(0,0,gameWidth,gameHeight);
    ctxMoney.fillText("Money"+ ": "+money,10,40)
}

function CollisionEnemy(){

 }
 var colliding =function(b1,b2){
  return !(b1==b2||
    b1.position.x + b1.size.width/2<b2.position.x - b2.size.width/2||
    b1.position.y + b1.size.height/2<b2.position.y - b2.size.height/2||
    b1.position.x + b1.size.width/2<b2.position.x - b2.size.width/2||
    b1.position.y + b1.size.height/2<b2.position.y - b2.size.height / 2)

 }
