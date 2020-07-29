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
  rect(0, 19 * gridSize, gridSize, gridSize);
  rect(2 * gridSize, 19 * gridSize, gridSize, gridSize);
  rect(36 * gridSize, 9 * gridSize, gridSize, gridSize);
  rect(19 * gridSize, 42 * gridSize, gridSize, gridSize);
  rect(19 * gridSize, 44 * gridSize, gridSize, gridSize);
}