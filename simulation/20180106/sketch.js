function setup() {
  createCanvas(500, 500);
  background(255);
  blendMode(DARKEST);

  noStroke();

  drawWaterColor(width/2-60, height/2+40, 100, color(245, 10, 50, 2));
  drawWaterColor(width/2+60, height/2-40, 100, color(60, 55, 235, 2));
}

function drawWaterColor(x, y, radius, c) {
  for(let j=0; j<50; j++) {
    let vertices = createBasicVertices(x, y, 160 - j*0.1, floor(random(5, 10)));

    for(let i=0; i<4; i++) {
      vertices = deformVertices(x, y, vertices);
      fill(c);
      renderVertices(vertices);
    }
  }
}

function createBasicVertices(x, y, radius, numPoints) {
  let angle = TWO_PI / numPoints;
  let vs = [];
  let offset = random(PI);
  for(let a = offset; a < TWO_PI+offset; a+=angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    let v = createVector(sx, sy);
    vs.push(v)
  }
  return vs;
}

function deformVertices(x, y, vertices) {
  let vs = [];
  let a, b, c;
  let center = createVector(x, y);
  for(let i=0; i<vertices.length-1; i++) {
    a = vertices[i].copy().sub(center);
    c = vertices[i+1].copy().sub(center);
    b = a.add(c).mult(random(0.32, 0.55)).add(center);
    vs.push(vertices[i], b, vertices[i+1]);
  }
  a = vertices[vertices.length-1].copy().sub(center);
  c = vertices[0].copy().sub(center);
  b = a.add(c).mult(random(0.32, 0.55)).add(center);
  vs.push(vertices[vertices.length-1], b, vertices[0]);

  return vs;
}

function renderVertices(vertices) {
  beginShape();
  for(let i=0; i<vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape();
}
