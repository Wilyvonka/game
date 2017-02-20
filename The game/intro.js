function goal() {
    background(0);
    fill(0, 255, 255);
    textSize(70);
    textAlign(CENTER);
    text("Objective:", width / 2, 200);
    textSize(30);
    text('Your goal is to defend the planet Ilias from the orange asteroids,', width / 2, 400);
    text('while making sure the planet does not run out of suplies', width / 2, 475);
    text('If the supplies are running low, make sure to guide the grey supplycrates to the planet', width / 2, 550);
}

function Intro() {
    background(0);
    fill(0, 255, 255);
    textSize(100);
    textAlign(CENTER);
    text("Welcome", width / 2, height / 2 - 100);
    textSize(50);
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
    textSize(30);
    text('2 days ago the planet Ilias launched a large trading caravan heading towards the closest planet.', width / 2, height / 2 - 150);
    text('Unfortunately on the way back the caravan ran into trouble in a asteroid-storm,', width / 2, height / 2 - 75);
    text('and all ships were lost. The asteroid-storm is now approaching Ilias', width / 2, height / 2);
    text('It is up to you to defend your home!', width / 2, height / 2 + 75);
    textSize(70);
    text("Good Luck!", width / 2, height - height / 10);
    textSize(20);
    textAlign(CENTER, TOP);
    text('Music', width - width / 7, height - 60);
    text('Sound effects', width - width / 7, height - 30);
    text('(Use firefox if sound effects are not muted completely)', width / 2, height - 30);

}


function Tutorial() {
    background(0);
    fill(0, 255, 255);
    textSize(70);
    textAlign(CENTER);
    text("Controls:", width / 2, 200);
    textSize(60);
    text('Movement: arrows/WASD', width / 2, 400);
    text('Repulsion Beam: space bar', width / 2, 475);
    text('Attraction Beam: Z/M', width / 2, 550);

}


function Game() {

    background(12);
    if (random(0, 1) < sSpawn) {
        supplies.push(new Supply());
        ssSpawn = 0;
    }

    if (ssSpawn >= 1) {
        supplies.push(new Supply());
        ssSpawn = 0;
    }
    for (var i = supplies.length - 1; i >= 0; i--) {
        supplies[i].render();
        supplies[i].update();
        supplies[i].gainLife();
        if (supplies[i].done()) {
            supplies.splice(i, 1);
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
    for (var i = lasers.length - 1; i >= 0; i--) {


        for (var k = asteroids.length - 1; k >= 0; k--) {

            if (lasers[i].hits(asteroids[k]) && t < 1) {
                asteroids[k].acc.add(lasers[i].vel);
                asteroids[k].acc.mult(0.02);
                t += 1;

            } else if (!lasers[i].hits(asteroids[k])) {
                t = 0;
            }
        }
    }



    for (var i = lasers.length - 1; i >= 0; i--) {


        for (var j = supplies.length - 1; j >= 0; j--) {

            if (lasers[i].hitsSup(supplies[j]) && t < 1) {
                supplies[j].acc.add(lasers[i].vel);
                supplies[j].acc.mult(0.02);
                t += 1;

            } else if (!lasers[i].hitsSup(supplies[j])) {
                t = 0;
            }
        }


        lasers[i].render();
        lasers[i].update();

        if (lasers[i].done()) {
            lasers.splice(i, 1);
        }
    }


    for (var i = 0; i < attractors.length; i++) {
        for (var j = 0; j < supplies.length; j++) {

            if (attractors[i].hitsSup(supplies[j]) && t < 1) {
                supplies[j].acc.sub(attractors[i].vel);
                supplies[j].acc.mult(0.02);
                t += 1;

            } else if (!attractors[i].hitsSup(supplies[j])) {
                t = 0;
            }
        }
    }

    for (var i = 0; i < attractors.length; i++) {

        for (var j = asteroids.length - 1; j >= 0; j--) {

            if (attractors[i].hits(asteroids[j]) && t < 1) {
                asteroids[j].acc.sub(attractors[i].vel);
                asteroids[j].acc.mult(0.02);
                t += 1;
            } else if (!attractors[i].hits(asteroids[j])) {
                t = 0;
            }
        }
        attractors[i].render();
        attractors[i].update();

        if (attractors[i].done()) {
            attractors.splice(i, 1);
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
        gameComplete();
    }

    hp -= 0.001;
    if (hp < 2) {
        ssSpawn += 0.001;
    } else {
        ssSpawn = 0
    }
}
