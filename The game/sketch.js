var ship;
var asteroids = [];
var supplies = [];
var lasers = [];
var attractors = [];
var t = 0;
var highscore = 0;
var hp = 5;
var hpBar;
var planet;
var intro = 0;
var backstory = -1;
var spawn = 0;
var sSpawn = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  planet = new Planet();
}


function draw() {

  //var col = map(highscore, 0, 5000, 0, 255);
  //background(col,col/2,0);
  if (backstory === 1) {
    Backstory();
  } else if (intro === 0) {
    Intro();
  } else if (intro === 1) {
    Tutorial();
  } else {
    Game();
  }
  spawn = 0.005 + (highscore * 0.00001);
  sSpawn = 0.0008 + (highscore * 0.000005);
}


function keyReleased() {
  if (keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW || keyCode == 65 || keyCode == 68) {
    ship.setRotation(0);
  }
  if (keyCode == UP_ARROW || keyCode == 87) {
    ship.boosting(false);
  }

}




function keyPressed() {
  if (keyCode == RIGHT_ARROW || keyCode == 68) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW || keyCode == 65) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW || keyCode == 87) {
    ship.boosting(true);
  } else if (keyCode == 32) {
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if (keyCode == 90 || keyCode == 77) {
    attractors.push(new Attractor(ship.pos, ship.heading));
  }
  if (keyCode == 78) {
    intro += 1;
  }

  if (keyCode == 27) {
    intro += 10;
  }
  if (keyCode == 66) {
    backstory *= -1;
  }
}