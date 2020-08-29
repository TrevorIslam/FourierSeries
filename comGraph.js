const comGraph = (g) => {
  let sin = g.sin;
  let cos = g.cos;

  g.setup = () => {
    let cnv = g.createCanvas(500, 500);
    g.colorMode(g.HSB, 100);
    sliders["Amplitude Threshold"] = g.createSlider(0, 10, 0.1, 0.1);
    sliders["Angular Velocity"] = g.createSlider(0, 10, 1, 0.1);
    sliders["Zoom"] = g.createSlider(0.1, 2, 1, 0.1);
    sliders["Resolution"] = g.createSlider(1, 10, 4, 1); 
    for (var key in sliders) {
      let div = g.createDiv(key + ": ");
      div.parent("sliders");
      sliders[key].parent(div);
      let label = g.createSpan(sliders[key].value());
      label.parent(div);
    }
    attachSliderEvents();
    calcInputs();
    calcOutputs();
  }

  g.draw = () => {
    let margin = 50;
    g.background(0,0,25)
    g.strokeWeight(1);
    g.stroke(0, 100, 50);
    g.line(0, g.height - margin, g.width, g.height - margin);
    g.line(margin, 0, margin, g.width);

    let highPoints = outputX.filter((e, i) => e.amp > getVal("Amplitude Threshold"));
    let amps = highPoints.map((e) => e.amp);
    let maxAmp = Math.max(...amps);

    if (highPoints.length <= 0) return;
    let maxFreq = highPoints[Math.floor(highPoints.length / 2) - 1].freq;

    $(sliders["Angular Velocity"].elt)[0].max = (maxFreq * 1.5).toString();

    for (let i = 1; i <= 4; i++) {
      g.strokeWeight(1);
      g.stroke(0, 100, 50);
      g.line(margin - 10, (g.height - 2 * margin) / 4 * i - margin, margin, (g.height - 2 * margin) / 4 * i - margin);
      g.line((g.width - margin) / 4 * i, g.height - margin, (g.width - margin) / 4 * i, g.height - margin + 10);

      g.noStroke();
      g.fill(0,0,100);
      g.textAlign(g.CENTER, g.CENTER);
      g.text((maxAmp / 4 * (5-i)).toFixed(2), 18, (g.height - 2 * margin) / 4 * i - margin);
      g.text(maxFreq / 4 * i, (g.width - margin) / 4 * i, g.height - margin + 25);
    }

    for (let o of highPoints) {
      let x = o.freq / maxFreq * (g.width - 2 * margin) + margin;
      let y = g.height - margin - o.amp / maxAmp * (g.height - 2 * margin);

      let p = new Point (x, y, 60, 4);
      p.draw(g);
    }
  }
}

let comGraphp5 = new p5(comGraph, "comGraphcanvas");
