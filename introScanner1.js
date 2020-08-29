const introScanner1 = (s) => {
  s.setup = () => {
    let cnv = s.createCanvas(500, 500);
    s.colorMode(s.HSB, 100);
    s.background(0,0,25);

    sliders["Scanner Frequency"] = s.createSlider(0, 10, 1, 0.1);
    sliders["Scanner Frequency"].parent("introScanner1canvas");

  }

  s.draw = () => {
    s.background(0,0,25)
    s.strokeWeight(1);
    s.stroke(0, 100, 50);
    s.line(0,250,500,250);
    s.line(250,0,250,500);

    let input = [];

    for (let i = 0; i < N; i++) {
      input.push(200 * sin(2 * PI * i / N));
    }
    let data = scan(getVal("Scanner Frequency"), input);

    data.points.forEach((p) => {
      p.draw(s, true);
    });

    s.fill(10, 100, 100);
    s.noStroke();
    s.ellipse(data.real + 250, data.imaginary + 250, 8, 8);
    points = [];
  }
}

let introScanner1p5 = new p5(introScanner1, "introScanner1canvas");
