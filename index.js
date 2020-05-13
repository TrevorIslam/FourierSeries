var x;
var y;
var ind = 0;
var k = 4;
var w = 1;
var res = 1000;
var zoom = 100;
var points = [];

function setup () {
  console.clear();
  createCanvas(500, 500);
  colorMode(HSB, 100);
  background(0,0,25);
}

function draw () {
  background(0,0,25)
  strokeWeight(1);
  stroke(0, 100, 50);
  line(0,250,500,250);
  line(250,0,250,500);
  for (let t = 0; t < 6*PI; t+=PI/res) {
    var amplitude = sin(2*t);
    amplitude *= zoom;
    let p = new Point(250 + amplitude * cos(w*t), 250 + amplitude * sin(w*t), 50);
    points.push(p);
    p.draw();
  }
  findCenter(points);
  points = [];
}

function findCenter (points) {
  var totalx = 0;
  var totaly = 0;
  for (let point of points) {
    totalx += (point.x - 250);
    totaly += (point.y - 250);
  }
  totalx /= points.length;
  totaly /= points.length;
  fill(10, 100, 100);
  noStroke();
  stroke(20, 100, 100);
  strokeWeight(1);
  ellipse(totalx + 250, totaly + 250, 8, 8);
}


$(document).ready(() => {
  attachSliderEvents();
})

function attachSliderEvents () {
  $("#wslider").on("input", function(){
    let val = parseFloat($(this).val());
    w = val;
    $("#wvalue").text(val);
  })
  $("#zoomslider").on("input", function(){
    let val = parseFloat($(this).val());
    zoom = val;
    $("#zoomvalue").text(val);
  })
  $("#resslider").on("input", function(){
    let val = parseFloat($(this).val());
    res = val;
    $("#resvalue").text(val);
  })
}
