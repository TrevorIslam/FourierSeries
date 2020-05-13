class Point {
  constructor (x, y, h) {
    this.x = x;
    this.y = y;
    this.h = h;
  }

  draw () {
    noStroke();
    fill(this.h, 100, 100);
    ellipse(this.x, this.y, 2, 2);
    stroke(25,100,80);
    strokeWeight(1);
    //line(250,250, this.x, this.y);
  }

}
