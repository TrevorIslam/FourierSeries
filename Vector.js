class Vector {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  lerp (v, p) {
    let d = new Vector(v.x - this.x, v.y - this.y);
    return new Vector(this.x + d.x * p, this.y + d.y * p);
  }

  mag () {
    return (sqrt(this.x * this.x + this.y * this.y));
  }
}
