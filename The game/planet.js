function Planet() {
  this.r = 400;
  this.x = width / 2;
  this.y = height + 250;

  this.render = function() {


    push();
    fill(0, 255, 0);
    stroke(0, 0, 255, 200);
    strokeWeight(8);
    ellipse(this.x, this.y, 2*this.r)
    pop();
  }
}