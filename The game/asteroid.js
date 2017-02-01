function Asteroid() {
  this.r = random(25, 50);
  this.pos = createVector(random(width), 0 - this.r);
  this.vel = createVector(random(-0.7, 0.7), random(0.8, 2));
  this.acc = createVector();
  this.total = floor(random(8, 14));
  this.offset = [];
  this.d = 0;
  for (var i = 0; i < this.total; i++) {
    this.offset[i] = random(-10, 10);
  }
  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.d = dist(this.pos.x, this.pos.y, planet.x, planet.y);

  }
  this.render = function() {
    push();
    fill(200, 100, 0);
    translate(this.pos.x, this.pos.y);
    beginShape();
    for (var i = 0; i < this.total; i++) {
      var angle = map(i, 0, this.total, 0, TWO_PI);
      var r = this.r + this.offset[i];
      var x = r * cos(angle);
      var y = r * sin(angle);
      vertex(x, y);

    }
    endShape(CLOSE);
    pop();
  };



  this.done = function() {
    if (this.pos.x > width + this.r || this.pos.x < -this.r || this.pos.y > height + this.r || this.pos.y < -2 * this.r || this.d < planet.r + this.r) {
      return true;
    } else {
      return false;
    }

  }

  this.looseLife = function() {
    if (this.d <= this.r + planet.r) {
      effects[2].play();
      if (hp < 1) {
        hp = 0
      } else {
        hp = hp - 1
      }
    }


  };




}