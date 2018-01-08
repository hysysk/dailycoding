const points = [
  [120, 120, 0], [160, 120, 90], [180, 100, 0], [260, 170, 90],
  [240, 280, 45], [320, 120, 30], [380, 380, 0]
]

function setup() {
  createCanvas(500, 500);
  background(0);

  for(let j=0; j<points.length-1; j++) {
    let [px, py, pyaw, mode, clen] = pathPlanning(
      points[j][0], points[j][1], points[j][2],
      points[j+1][0], points[j+1][1], points[j+1][2], 40);

    textSize(12);
    fill(255, 255, 0);
    noStroke();
    text(mode.join(""), points[j][0], points[j][1]);
    console.log(mode.join(""));

    noFill();
    stroke(255);
    beginShape();
    for(let i=0; i<px.length; i++) {
      vertex(px[i], py[i]);
    }
    endShape();
  }
}
