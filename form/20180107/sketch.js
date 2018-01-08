const startX = 100;
const startY = 100;
const startYaw = deg2rad(-90);
const endX = 400;
const endY = 400;
const endYaw = deg2rad(-90);
const curvature = 50;

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
    vertex(px[i], py[i]);
  }
  endShape();
}
