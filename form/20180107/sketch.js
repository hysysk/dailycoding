const startX = 2.0;
const startY = 2.0;
const startYaw = deg2rad(-90.0);
const endX = 8.0;
const endY = 8.0;
const endYaw = deg2rad(-90.0);
const curvature = 1.0;

function setup() {
  createCanvas(500, 500);
  background(0);
  stroke(255);
  strokeWeight(4);
  noFill();
  let [px, py, pyaw, mode, clen] = pathPlanning(startX, startY, startYaw, endX, endY, endYaw, curvature);
  // console.log(mode.join(""));
  beginShape();
  for(let i=0; i<px.length; i++) {
    vertex(px[i] * 50, py[i] * 50);
  }
  endShape();
}
