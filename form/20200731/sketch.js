let graphics = [];
let graphicIndex = 0;

function setup() {
  createCanvas(510, 510);

  noStroke();
  fill(0);

  let gridNumber = 51;
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

  rect(37 * gridSize, 14 * gridSize, gridSize, gridSize);
  rect(39 * gridSize, 12 * gridSize, gridSize, gridSize);
  rect(41 * gridSize, 14 * gridSize, gridSize, gridSize);
  rect(43 * gridSize, 12 * gridSize, gridSize, gridSize);

  rect(30 * gridSize, 33 * gridSize, gridSize, gridSize);
  rect(30 * gridSize, 35 * gridSize, gridSize, gridSize);
  rect(34 * gridSize, 35 * gridSize, gridSize, gridSize);
  rect(34 * gridSize, 37 * gridSize, gridSize, gridSize);

  rect(10 * gridSize, 39 * gridSize, gridSize, gridSize);
  rect(8 * gridSize, 41 * gridSize, gridSize, gridSize);
  rect(12 * gridSize, 41 * gridSize, gridSize, gridSize);
  rect(10 * gridSize, 43 * gridSize, gridSize, gridSize);
}