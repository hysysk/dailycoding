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
      let x = i * GRID_SIZE + OFFSET;
      let y = j * GRID_SIZE + OFFSET;
      let v = createVector(x, y);
      points.push(v);
      fill(0);
      text(j*4+i, x, y);
    }
  }

  noFill();
  stroke(0);
  beginShape();
  drawArcPath(points[0].x, points[0].y, CIRCLE_RADIUS, HALF_PI, -HALF_PI, 4, false);
  drawArcPath(points[5].x, points[5].y, CIRCLE_RADIUS, PI, PI, 4, true);
  drawArcPath(points[2].x, points[2].y, CIRCLE_RADIUS, HALF_PI, -PI, 4, false);
  drawArcPath(points[3].x, points[3].y, CIRCLE_RADIUS, PI, -HALF_PI, 4, false);
  drawArcPath(points[6].x, points[6].y, CIRCLE_RADIUS, PI, -HALF_PI, 4, true);
  drawArcPath(points[11].x, points[11].y, CIRCLE_RADIUS, PI+HALF_PI/2, -HALF_PI, 4, false);
  drawArcPath(points[10].x, points[10].y, CIRCLE_RADIUS, PI-HALF_PI/2, -HALF_PI/2, 4, true);
  drawArcPath(points[13].x, points[13].y, CIRCLE_RADIUS, HALF_PI, 0, 4, false);
  drawArcPath(points[12].x, points[12].y, CIRCLE_RADIUS, HALF_PI, HALF_PI, 4, false);
  drawArcPath(points[0].x, points[0].y, CIRCLE_RADIUS, HALF_PI, PI, 4, false);
  endShape();
}

function drawArcPath(x, y, radius, angle, offsetAngle, details, clockwise) {
  let anchorTheta = 0;
  let controlTheta = angle/details/3;
  if(clockwise) {
    controlTheta *= -1;
  }
  let controlRadius = radius/cos(controlTheta);

  let anchors = [];
  let controlsL = [];
  let controlsR = [];

  let px;
  let py;
  let cx1;
  let cy1;
  let cx2;
  let cy2;

  for(let i=0; i<details+1; i++) {
    px = cos(anchorTheta + offsetAngle) * radius + x;
    py = sin(anchorTheta + offsetAngle) * radius + y;
    anchors.push(createVector(px, py));

    cx1 = cos(anchorTheta + controlTheta + offsetAngle) * controlRadius + x;
    cy1 = sin(anchorTheta + controlTheta + offsetAngle) * controlRadius + y;
    controlsL.push(createVector(cx1, cy1));

    cx2 = cos(anchorTheta + controlTheta*2 + offsetAngle) * controlRadius + x;
    cy2 = sin(anchorTheta + controlTheta*2 + offsetAngle) * controlRadius + y;
    controlsR.push(createVector(cx2, cy2));

    if(clockwise) {
      anchorTheta -= angle/details;
    } else {
      anchorTheta += angle/details;
    }

  }

  vertex(anchors[0].x, anchors[0].y);
  for(let i=0; i<details; i++){
    bezierVertex(controlsL[i].x, controlsL[i].y, controlsR[i].x, controlsR[i].y, anchors[i+1].x, anchors[i+1].y);
  }

  return anchors[anchors.length-1];
}
