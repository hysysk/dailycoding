function setup() {
  createCanvas(500, 500);
  background(255);
  fill(0);

  let x = -100;
  let y = height/2;
  let size = random(30, 100);
  let angle = random(-HALF_PI/2, HALF_PI/2);
  let nextSize = size;
  let nextAngle = angle;
  let antiClockwise = false;

  beginShape();
  vertex(0, height);

  while(x < width + size) {
    nextSize = random(30, 100);
    nextAngle = random(-HALF_PI/2, HALF_PI/2);
    let diffAngle = nextAngle - angle;
    if(antiClockwise) {
      diffAngle *= -1;
    }

    strokeWeight(random(2, 10));
    drawArcPath(x, y, size/2, PI+diffAngle, PI+angle, 4, antiClockwise);

    let nextX = x + cos(nextAngle) * (nextSize/2 + size/2);
    let nextY = y + sin(nextAngle) * (nextSize/2 + size/2);

    antiClockwise = !antiClockwise;

    x = nextX;
    y = nextY;
    size = nextSize;
    angle = nextAngle;
  }

  vertex(width, height);
  endShape();
}

function drawArcPath(x, y, radius, angle, offsetAngle, details, antiClockwise) {
  let anchorTheta = 0;
  let controlTheta = angle/details/3;
  let step = angle / details;
  if(antiClockwise) {
    controlTheta *= -1;
    step *= -1;
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

    anchorTheta += step;
  }

  vertex(anchors[0].x, anchors[0].y);
  for(let i=0; i<details; i++){
    bezierVertex(controlsL[i].x, controlsL[i].y, controlsR[i].x, controlsR[i].y, anchors[i+1].x, anchors[i+1].y);
  }

  return anchors[anchors.length-1];
}

function mouseReleased() {
  setup();
}

function touchEnded() {
  setup();
}
