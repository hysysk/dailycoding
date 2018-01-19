function setup() {
  createCanvas(500, 500);
  // background(255,250,250);
  strokeCap(SQUARE);

  paintOilColor(130, 100, 100, 200, color(245, 10, 50));
  paintOilColor(200, 80, 80, 150, color(42, 162, 239));
  paintOilColor(300, 220, 160, 150, color(105, 155, 42));
  paintOilColor(420, 80, 50, 40, color(255, 206, 0));
}

function paintOilColor(x, y, w, h, c) {
  let stepY = 1;
  let stepX = 2;
  let offsetX = w/2;

  for(let i=0; i<w; i+=stepY) {
    strokeWeight(random(0.1, 2));
    for(let j=0; j<h; j+=stepX) {
      stroke(c, 255 - Easing.cubicIn(j/h) * 255);
      line(x+i-offsetX+random(-2, 2), y+random(-15, 15), x+i-offsetX+random(-2, 2), y+j);
    }
  }
}
