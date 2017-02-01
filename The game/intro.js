function Intro() {
  background(0);
  fill(0, 255, 255);
  textSize(100);
  textAlign(CENTER);
  text("welcome", width / 2, height / 2 - 100);
  textSize(50)
  text('Press n for tutorial or space to skip', width / 2, height / 2 + 100);
  text('Press b to take a break/read the backstory', width / 2, height / 2 + 200);
  textSize(35);
  text('Tip: press T to toggle fullscreen!', width / 2, height / 2 + 400);

}

function Backstory() {
  background(0);
  fill(0, 255, 255);
  textSize(70);
  textAlign(CENTER);
  text('Press b to continue', width / 2, height / 2 - 300);
  textSize(30)
  text('2 days ago the planet Ilias launched a large trading caravan heading towards the closest planet.', width / 2, height / 2 - 150);
  text('Unfortunately on the way back the caravan ran into trouble in a asteroid-storm,', width / 2, height / 2 - 75);
  text('and all ships were lost. The asteroid-storm is now approaching Ilias', width / 2, height / 2);
  text('It is up to you to defend your home!', width / 2, height / 2 + 75);
  text('Oh and Ilias is running low on supplies so try to pick up the gray packages from the caravan :)', width / 2, height / 2 + 150);
  textSize(70)
  text("Good Luck!", width / 2, height - height/10);
  textSize(20);
  textAlign(CENTER, TOP);
  text('Music', width - width / 7, height - 60)
  text('Sound effects', width - width / 7, height - 30)

}

function Tutorial() {
  background(0);
  fill(0, 255, 255);
  textSize(70);
  textAlign(CENTER);
  text("Controls:", width / 2, 200);
  textSize(60)
  text('Movement: arrows/WASD', width / 2, 400);
  text('Repulsion Beam: space bar', width / 2, 475);
  text('Attraction Beam: Z/M', width / 2, 550);

}


function Game() {

  background(0);
  if (random(0, 1) < sSpawn) {
    supplies.push(new Supply());
    ssSpawn = 0;
  }

  if (ssSpawn >= 1) {
    supplies.push(new Supply());
    ssSpawn = 0
  }
  for (var o = supplies.length - 1; o >= 0; o--) {
    supplies[o].render();
    supplies[o].update();
    supplies[o].gainLife();
    if (supplies[o].done()) {
      supplies.splice(o, 1);
    }
  }
  if (random(0, 1) < spawn) {
    asteroids.push(new Asteroid());
  }

  for (var i = asteroids.length - 1; i >= 0; i--) {
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].looseLife();
    if (asteroids[i].done()) {
      asteroids.splice(i, 1);
    }
  }
  for (var j = lasers.length - 1; j >= 0; j--) {


    for (var k = asteroids.length - 1; k >= 0; k--) {

      if (lasers[j].hits(asteroids[k]) && t < 1) {
        asteroids[k].acc.add(lasers[j].vel);
        asteroids[k].acc.mult(0.02);
        // laser.splice(j, 1);
        t += 1;

      } else if (!lasers[j].hits(asteroids[k])) {
        t = 0;
      }
    }
  }



  for (var h = lasers.length - 1; h >= 0; h--) {


    for (var p = supplies.length - 1; p >= 0; p--) {

      if (lasers[h].hitsSup(supplies[p]) && t < 1) {
        supplies[p].acc.add(lasers[h].vel);
        supplies[p].acc.mult(0.02);
        // laser.splice(j, 1);
        t += 1;

      } else if (!lasers[h].hitsSup(supplies[p])) {
        t = 0;
      }
    }


    lasers[h].render();
    lasers[h].update();

    if (lasers[h].done()) {
      lasers.splice(h, 1);
    }
  }


  for (var a = 0; a < attractors.length; a++) {
    for (var u = 0; u < supplies.length; u++) {

      if (attractors[a].hitsSup(supplies[u]) && t < 1) {
        supplies[u].acc.sub(attractors[a].vel);
        supplies[u].acc.mult(0.02);
        t += 1;

      } else if (!attractors[a].hitsSup(supplies[u])) {
        t = 0;
      }
    }
  }

  for (var y = 0; y < attractors.length; y++) {

    for (var e = asteroids.length - 1; e >= 0; e--) {

      if (attractors[y].hits(asteroids[e]) && t < 1) {
        asteroids[e].acc.sub(attractors[y].vel);
        asteroids[e].acc.mult(0.02);
        t += 1;
      } else if (!attractors[y].hits(asteroids[e])) {
        t = 0;
      }
    }
    attractors[y].render();
    attractors[y].update();

    if (attractors[y].done()) {
      attractors.splice(y, 1);
    }
  }


  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
  planet.render();

  if (frameCount % 20 === 0) {
    highscore += 1;
  }
  hpBar = map(hp, 0, 5, -100, -200);
  push();
  rectMode(CORNERS)
  noFill();
  stroke(255);
  rect(width - 71, height - 100, width - 50, height - 200);
  fill(255, 0, 0);
  noStroke();
  rect(width - 50, height - 100, width - 70, height + hpBar)
  pop();

  fill(255, 220);
  textSize(20);
  text([highscore], width - 200, 50);
  text("highscore:", width - 300, 50)
    //text(hp, 10, 50);

  if (hp <= 0) {
    textAlign(CENTER);
    textSize(100);
    fill(255, 0, 0);
    text("Game Over!", width / 2, height / 2);
    noLoop();
  }

  if (highscore >= 2000) {
    textAlign(CENTER);
    textSize(100);
    fill(255, 0, 0);
    text("Well Done!", width / 2, height / 2);
    noLoop();
  }

  hp -= 0.001;
  if (hp < 2) {
    ssSpawn += 0.001;
  } else {
    ssSpawn = 0
  }

}