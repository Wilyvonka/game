function Supply() {
  this.r = 30;
  this.pos = createVector(random(width), 0 - this.r);
  this.vel = createVector(random(-1.5, 1.5), random(0.7, 2));
  this.acc = createVector();
  this.d = 0;


  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.d = dist(this.pos.x, this.pos.y, planet.x, planet.y);
  }
  this.render = function() {
    push();
    fill(100);
    ellipseMode(CENTER);
    ellipse(this.pos.x, this.pos.y, 2 * this.r, 2 * this.r);
    pop();
  }
  this.done = function() {
    if (this.pos.x > width + this.r || this.pos.x < -this.r || this.pos.y > height + this.r || this.pos.y < -2 * this.r || this.d < planet.r + this.r) {
      return true;
    } else {
      return false;
    }

  }



  this.gainLife = function() {
    if (this.d <= this.r + planet.r) {
      effects[3].play();
      if (hp > 4) {
        hp = 5
      } else {
        hp = hp + 1
      }
    }
  };

}