class Point {
  constructor (x, y, h, s = 2) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.s = s;
  }

  draw (p) {
    p.noStroke();
    p.fill(this.h, 100, 100);
    p.ellipse(this.x, this.y, this.s, this.s);
    p.stroke(25,100,80);
    p.strokeWeight(1);
    //p.line(250,250, this.x, this.y);
  }

}
