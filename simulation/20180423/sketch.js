function setup() {
  createCanvas(500, 500);

  spray(250, 250, 130, color(22, 98, 230, 50));
}

function spray(xoff, yoff, r, c) {
  stroke(c);
  for(let i=0; i<r*1000; i++) {
    let radius = random(-r, r);
    let angle = random(TWO_PI);
    let randomOffset = random(-r*0.3, r*0.3);
    let x = cos(angle) * radius + xoff + cos(angle) * randomOffset;
    let y = sin(angle) * radius + yoff + sin(angle) * randomOffset;
    point(x, y);
  }
}
