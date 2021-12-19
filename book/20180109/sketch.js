const CIRCLE_RADIUS = 50;
const GRID_SIZE = 120;
const OFFSET = 70;

let points = [];

function setup() {
  createCanvas(500, 500);
  textSize(12);
  textAlign(CENTER);
  noStroke();

  for(let j=0; j<4; j++) {
    for(let i=0; i<4; i++) {
      fill(200);
      ellipse(i*GRID_SIZE+OFFSET, j*GRID_SIZE+OFFSET, CIRCLE_RADIUS*2, CIRCLE_RADIUS*2);
      for(let a=0; a<4; a++) {
        let x = cos(a*HALF_PI) * CIRCLE_RADIUS + i * GRID_SIZE + OFFSET;
        let y = sin(a*HALF_PI) * CIRCLE_RADIUS + j * GRID_SIZE + OFFSET;
        let v = createVector(x, y);
        points.push(v);
        fill(0);
        text(j*4*4 + i*4 + a, x, y);
      }
    }
  }

  let drawPoints = [
    points[3], points[0], points[22], points[21], points[20], points[10], points[11], points[15], points[12], points[13], points[27], points[26], points[25], points[47], points[44], points[45],
    points[46], points[43], points[42], points[52], points[53], points[49], points[50], points[2],
    points[3]
  ];

  beginShape();
  noFill();
  stroke(0);
  for(let i=0; i<drawPoints.length; i++) {
    vertex(drawPoints[i].x, drawPoints[i].y);
  }
  endShape();
}
