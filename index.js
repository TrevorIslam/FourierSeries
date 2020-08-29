var x;
var y;
var ind = 0;
var points = [];
var lerpRes = 5;
var N = (data.length - 2) / 2 * (lerpRes);

var inputX = [];
var inputY = [];
var lerpedInputX = [];
var lerpedInputY = [];
var outputX = [];
var outputY = [];

var sliders = {};

const PI = Math.PI;
const sin = Math.sin;
const cos = Math.cos;
const sqrt = Math.sqrt;

const scanner = (s) => {
  let sin = s.sin;
  let cos = s.cos;

  s.setup = () => {
    let cnv = s.createCanvas(500, 500);
    s.colorMode(s.HSB, 100);
    s.background(0,0,25);

  }

  s.draw = () => {
    s.background(0,0,25)
    s.strokeWeight(1);
    s.stroke(0, 100, 50);
    s.line(0,250,500,250);
    s.line(250,0,250,500);

    let data = scan(getVal("Angular Velocity"), inputX);

    data.points.forEach((p) => {
      p.draw(s, true);
    });

    s.fill(10, 100, 100);
    s.noStroke();
    s.ellipse(data.real * getVal("Zoom") + 250, data.imaginary * getVal("Zoom") + 250, 8, 8);
    points = [];
  }
}

let scannerp5 = new p5(scanner, "scannercanvas");

function scan (w, input) {
  var points = [];
  var real = 0;
  var imaginary = 0;

  for (let t = 0; t < N; t++) {
    let dt = 2 * PI * t / N;
    var amplitude = input[t];
    let x = amplitude * cos(w * dt);
    let y = amplitude * sin(w * dt);
    let p = new Point(250 + x, 250 + y, 50);
    points.push(p);
    real += x;
    imaginary += y;
  }

  real /= N;
  imaginary /= N;

  let freq = w;
  let amp = sqrt(real * real + imaginary * imaginary);
  let phase = Math.atan2(imaginary, real);

  return {points, real, imaginary, phase, freq, amp};
}

function calcLerpedInputs () {
  lerpedInputX = [];
  lerpedInputY = [];
  for (let i = 0; i < data.length - 3; i += 2) {
    let current = new Vector(data[i], data[i + 1]);
    let next = new Vector(data[i + 2], data[i + 3]);
    for (let p = 0; p < .999999; p = p + 1/lerpRes, 2) {
      let v = current.lerp(next, p);
      lerpedInputX.push(v.x);
      lerpedInputY.push(v.y);
    }
  }
}

function calcInputs () {
  inputX = [];
  inputY = [];
  for (let i = 0; i < data.length - 1; i += 2) {
    inputX.push(data[i]);
    inputY.push(data[i + 1]);
  }
}

function calcOutputs (lerped = false) {
  outputX = [];
  outputY = [];

  for (let w = 0; w < N; w++) {
    outputX.push(scan(w, (lerped ? lerpedInputX : inputX)));
    outputY.push(scan(w, (lerped ? lerpedInputY : inputY)));
  }
}

function getVal (key) {
  return sliders[key].value();
}

$(document).ready(() => {
  attachSliderEvents();
})

function attachSliderEvents () {
  $("input").on("input", function(){
    calcOutputs();
    createEpicycles();
    $(this).siblings("span").text($(this).val());
  })
}
