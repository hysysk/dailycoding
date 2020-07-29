let graphics = [];
let graphicIndex = 0;

function setup() {
  createCanvas(505, 505);

  noStroke();
  fill(0);

  let gridNumber = 101;
  let gridSize = width / gridNumber;

  for(let j=0; j<gridNumber; j++) {
    for(let i=0; i<gridNumber; i++) {
      if(i%2 == 0 || j%2 == 0) {
        rect(i * gridSize, j * gridSize, gridSize, gridSize);
      }
    }
  }

  fill(255);
  rect(50 * gridSize, 50 * gridSize, gridSize, gridSize);
  rect(49 * gridSize, 50 * gridSize, gridSize, gridSize);
  rect(51 * gridSize, 50 * gridSize, gridSize, gridSize);
  rect(50 * gridSize, 49 * gridSize, gridSize, gridSize);
  rect(50 * gridSize, 51 * gridSize, gridSize, gridSize);
}