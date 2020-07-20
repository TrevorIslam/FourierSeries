var epicyclesArray = [];
var drawing = [];

const epicycles = (e) => {
  var t = 0;
  e.setup = () => {
    e.createCanvas(500, 500);
    e.colorMode(e.HSB, 100);
  }

  e.draw = () => {
    e.translate(e.width / 2, e.height / 2);
    e.stroke(0, 0, 100);
    e.strokeWeight(1);
    e.background(0, 0, 25);
    if (epicyclesArray.length <= 0) return;
    let x = 0;
    let y = 0;
    epicyclesArray.forEach((epi, i) => {
      if (epi.parent != null)  {
        x += getVal("Zoom") * epi.parent.r * cos(epi.parent.w * t + epi.parent.phase);
        y += getVal("Zoom") * epi.parent.r  * sin(epi.parent.w * t + epi.parent.phase);
      }
      epi.draw(x, y, t, e);
    });

    let epi = epicyclesArray[epicyclesArray.length - 1];

    x += getVal("Zoom") * epi.r * cos(epi.w * t + epi.phase);
    y += getVal("Zoom") * epi.r * sin(epi.w * t + epi.phase);
    drawing.unshift(new Point(x, y, 30, 5));
    if (drawing.length > 2 * N) drawing.pop();

    e.beginShape();
    e.stroke(30, 100, 100);
    e.strokeWeight(3);
    drawing.forEach((p) => {
      e.curveVertex(p.x, p.y);
      // e.point(p.x, p.y);
    });
    e.endShape();
    t += 2 * PI / N;
  }
}

let epicyclesp5 = new p5(epicycles, "epicyclescanvas");

function createEpicycles () {
  drawing = [];
  calcLerpedInputs();
  calcOutputs(true);
  epicyclesArray = [];
  if (outputX.length != outputY.length) console.log(outputX, outputY);
  for (let i = 0; i < outputX.length; i++) {
    if (outputX[i].amp < getVal("Amplitude Threshold") && outputY[i].amp < getVal("Amplitude Threshold")) continue;
    new Epicycle (outputX[i].amp, outputX[i].freq, outputX[i].phase);
    new Epicycle (outputY[i].amp, outputY[i].freq, outputY[i].phase + PI/2);
  }
  epicyclesArray.sort((a, b) => {return a.r > b.r ? -1 : 1});
  var rMax = epicyclesArray[0].r;
  epicyclesArray.forEach((item, i) => {
    if (i != 0) item.parent = epicyclesArray[i - 1];
    item.hue = 100 - item.r / rMax * 100;
  });

}

class Epicycle {
  constructor (r, w, phase) {
    this.r = r;
    this.w = w;
    this.phase = phase;
    this.parent = null;
    this.hue = 0;
    epicyclesArray.push(this);
  }

  draw (x, y, time, cnv) {
    let armX = x + getVal("Zoom") * this.r * cos(this.w * time + this.phase);
    let armY = y + getVal("Zoom") * this.r * sin(this.w * time + this.phase);
    cnv.noFill();
    cnv.stroke(this.hue, 100, 100);
    cnv.circle(x, y, 2 * getVal("Zoom") * this.r);
    cnv.stroke(100,0,20);
    cnv.line(x, y, armX, armY);
  }
}
