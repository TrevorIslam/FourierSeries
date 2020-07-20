const comGraph = (g) => {
  let sin = g.sin;
  let cos = g.cos;

  g.setup = () => {
    let cnv = g.createCanvas(500, 500);
    g.colorMode(g.HSB, 100);
    sliders["Amplitude Threshold"] = g.createSlider(0, 10, 0.1, 0.1);
    sliders["Angular Velocity"] = g.createSlider(0, 10, 1, 0.1);
    sliders["Zoom"] = g.createSlider(1, 200, 1, 10);
    sliders["Resolution"] = g.createSlider(10, (data.length - 2) / 2 * (lerpRes), 100, 10);
    for (var key in sliders) {
      let div = g.createDiv(key + ": ");
      div.parent("sliders");
      sliders[key].parent(div);
      let label = g.createSpan(sliders[key].value());
      label.parent(div);
    }
    let button = g.createButton("Draw");
    button.parent("sliders");
    button.mousePressed(createEpicycles)
    attachSliderEvents();
    calcInputs();
    calcOutputs();
  }

  g.draw = () => {
    g.background(0,0,25)
    g.strokeWeight(1);
    g.stroke(0, 100, 50);
    g.line(0,250,500,250);
    g.line(250,0,250,500);

    for (let o of outputX) {
      let x = o.freq / 10 * g.width + g.width / 2;
      let y = o.amp;

      let p = new Point (x, g.height / 2 + -1 * y * getVal("Zoom"), 60, 8);
      p.draw(g);
    }
  }
}

let comGraphp5 = new p5(comGraph, "comGraphcanvas");
