let c;
function setup() {
  c = createCanvas(500, 500);
  drawPath();
}

function drawPath() {
  let colors = ["#BFD4EC", "#699B2A", "#F3E332", "#F8DCD5", "#12110C", "#FFFFFF"];

  let points = [];
  let bgColorIndex = floor(random(colors.length));
  background(colors[bgColorIndex]);

  colors.splice(bgColorIndex, 1);

  for(let i=0; i<10; i++) {
    points.push(createVector(random(width), random(height)));
  }

  stroke("#12110C");
  strokeWeight(12);
  strokeJoin(ROUND);
  strokeCap(ROUND);
  for(let i=0; i<points.length-1; i++) {
    let [px, py, pyaw, mode, clen] = pathPlanning(
      points[i].x, points[i].y, random(360),
      points[i+1].x, points[i+1].y, random(360), random(50, 80));
    fill(colors[floor(random(colors.length))]);
    beginShape();
    for(let j=0; j<px.length; j++) {
      vertex(px[j], py[j]);
    }
    endShape(CLOSE);
  }

  // saveCanvas(c, 'output', 'jpg');
}

function mouseReleased() {
  drawPath();
}

function touchEnded() {
  drawPath();
}
