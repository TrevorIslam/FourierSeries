var mouseDown = false;
var drawPoints = [];

const drawingInput = (d) => {
  d.setup = () => {
    d.createCanvas(500, 500);
    d.colorMode(d.HSB, 100);
    let drawButton = d.createButton("Draw");
    drawButton.mousePressed(updateDrawing);
    drawButton.parent("sliders");
  }

  d.draw = () => {
    d.translate(d.width / 2, d.height / 2);
    d.background(0, 0, 25);
    if (!mouseIn()) mouseDown = false;

    if (mouseDown) {
      let dist;
      if (drawPoints.length < 2) {
        dist = 100;
      } else {
        let x = drawPoints[drawPoints.length - 2] - d.mouseX;
        let y = drawPoints[drawPoints.length - 1] - d.mouseY;
        dist = sqrt(x * x + y * y);
      }

      if (dist > 10) {
        drawPoints.push(d.mouseX - d.width / 2);
        drawPoints.push(d.mouseY - d.height / 2);
      }
    }

    d.beginShape();
    d.stroke(50,100,100);
    d.fill(50,100,100);
    for (let i = 0; i < drawPoints.length; i+=2) {
      d.vertex(drawPoints[i], drawPoints[i+1]);
      d.ellipse(drawPoints[i], drawPoints[i+1], 4, 4);
    }
    d.noFill();
    d.endShape();
  }

  d.mousePressed = () => {
    if (d.mouseButton == d.LEFT) {
      mouseDown = true;
    }
  }

  d.mouseReleased = () => {
    if (d.mouseButton == d.LEFT) {
      mouseDown = false;
    }
  }

  function mouseIn() {
    return d.mouseX > 0 && d.mouseX < d.width && d.mouseY > 0 && d.mouseY < d.height;
  }

}

let drawingInputp5 = new p5(drawingInput, "drawingInputcanvas");

function updateDrawing() {
  if (drawPoints.length > 0) {
    data = drawPoints;
    data.push(data[0]);
    data.push(data[1]);
    lerpRes = getVal("Resolution");
    N = (data.length - 2) / 2 * (lerpRes);
    calcInputs();
    calcOutputs();
    createEpicycles();
  }
}
