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
var sounds = [];
var s = 0;
var load = 0;
var effects = [];
var ssSpawn = 0;
var songSlider;
var effectSlider;
var effectVolume;
var musicVolume;


function preload() {
  effects[0] = (loadSound('sound/laser3dd.mp3'));
  effects[1] = (loadSound('sound/laser2.mp3'));
  effects[2] = (loadSound('sound/fail.mp3'));
  effects[3] = (loadSound('sound/success.mp3'));

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  planet = new Planet();
  sounds[1] = (loadSound('sound/Fade.mp3', loaded));
  sounds[2] = loadSound('sound/BlueFlame.mp3', loaded);
  sounds[3] = loadSound('sound/SeaOfEnvy.mp3', loaded);

  songSlider = createSlider(0, 1, 0.5, 0.01);
  effectSlider = createSlider(0, 1, 0.5, 0.1);


}

function loaded() {
  load += 1

}

function draw() {
  var effectVolume = effectSlider.value();
  var musicVolume = songSlider.value();

  songSlider.position(width - width / 10, height - 60);
  effectSlider.position(width - width / 10, height - 30);
  if (sounds[s] !== undefined && sounds[s].isPlaying() === false && load >= 3) {
    sounds[s].play();
    if (sounds[s].currentTime() >= sounds[s].duration()) {
      sounds.splice(s, 1)
    }
  }


  if (sounds[s] === undefined) {
    s = floor(random(0, 3));
  }

  sounds[s].setVolume(musicVolume);
  effects[0].setVolume(effectVolume);
  effects[1].setVolume(effectVolume);
  effects[2].setVolume(effectVolume);
  effects[3].setVolume(effectVolume);

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
  sSpawn = 0.0001 + (highscore * 0.000005);



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
   // if (effectVolume > 0.1) {
      effects[0].play();
    //}
  } else if (keyCode == 90 || keyCode == 77) {
    attractors.push(new Attractor(ship.pos, ship.heading));
    effects[1].play();

  }
  if (keyCode == 78) {
    intro += 1;
  }

  if (keyCode == 32 && intro < 10) {
    intro += 10;

  }
  if (keyCode == 66) {
    backstory *= -1;

  }
  if (keyCode == 84) {
    var fs = fullscreen();
    fullscreen(!fs);
  }

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}