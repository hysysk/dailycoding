let graphics = [];
let graphicIndex = 0;

function setup() {
  createCanvas(495, 495);

  noStroke();
  fill(0);

  let gridNumber = 45;
  let gridSize = width / gridNumber;

  for(let j=0; j<gridNumber; j++) {
    for(let i=0; i<gridNumber; i++) {
      if(i%2 == 0 || j%2 == 0) {
        rect(i * gridSize, j * gridSize, gridSize, gridSize);
      }
    }
  }

  fill(255);
  rect(6 * gridSize, 7 * gridSize, gridSize, gridSize);
  rect(6 * gridSize, 9 * gridSize, gridSize, gridSize);
  rect(9 * gridSize, 8 * gridSize, gridSize, gridSize);
  rect(11 * gridSize, 8 * gridSize, gridSize, gridSize);

  rect(31 * gridSize, 14 * gridSize, gridSize, gridSize);
  rect(33 * gridSize, 12 * gridSize, gridSize, gridSize);
  rect(35 * gridSize, 14 * gridSize, gridSize, gridSize);
  rect(37 * gridSize, 12 * gridSize, gridSize, gridSize);

  rect(24 * gridSize, 27 * gridSize, gridSize, gridSize);
  rect(24 * gridSize, 29 * gridSize, gridSize, gridSize);
  rect(28 * gridSize, 29 * gridSize, gridSize, gridSize);
  rect(28 * gridSize, 31 * gridSize, gridSize, gridSize);

  rect(10 * gridSize, 33 * gridSize, gridSize, gridSize);
  rect(8 * gridSize, 35 * gridSize, gridSize, gridSize);
  rect(12 * gridSize, 35 * gridSize, gridSize, gridSize);
  rect(10 * gridSize, 37 * gridSize, gridSize, gridSize);
}