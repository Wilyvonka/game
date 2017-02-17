function Ship() {
  this.rotation = 0;
  this.heading = 0;
  this.r = 15;
  this.pos = createVector(width / 2, height / 2);
  this.vel = createVector(0, 0);
  this.isBoosting = false;


  this.boosting = function(b) {
    this.isBoosting = b;
  };

  this.update = function() {
    if (this.isBoosting) {
      this.boost();
    }

    this.pos.add(this.vel);
    this.vel.mult(0.98);
  };
  this.boost = function() {
    var force = p5.Vector.fromAngle(this.heading);
    force.mult(0.3);
    this.vel.add(force);
  };


  this.render = function() {
    push();
    translate(this.pos.x, this.pos.y, 0);
    rotate(this.heading + PI / 2);
    fill(150);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
    pop();
  };
  this.edges = function() {
    if (this.pos.x > width + this.r) {
      this.pos.x = 0 - this.r
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r
    } else if (this.pos.y > height + this.r) {
      this.pos.y = 0 - this.r
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r
    }
  };

  this.setRotation = function(a) {
    this.rotation = a;
  };
  this.turn = function() {
    this.heading += this.rotation

  };
}