function Attractor(spos, angle) {
  this.pos = createVector(spos.x, spos.y);
  this.vel = p5.Vector.fromAngle(angle);
  this.vel.mult(25);

  this.update = function() {
      this.pos.add(this.vel);
    },
    this.render = function() {
      push();
      stroke(0, 0, 255);
      strokeWeight(5.5);
      point(this.pos.x, this.pos.y);
      pop();
    };

  this.hits = function(asteroid) {
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < asteroid.r) {
      return true;
    } else {
      return false;
    }
  };
   this.hitsSup = function(supply) {
    var e = dist(this.pos.x, this.pos.y, supply.pos.x, supply.pos.y);
    if (e < supply.r) {
      return true;
    } else {
      return false;
    }
  };

  this.done = function() {
    if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
      return true;
    } else {
      return false;
    }
  };


}