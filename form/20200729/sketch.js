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
  rect(0, 19 * gridSize, gridSize, gridSize);
  rect(2 * gridSize, 19 * gridSize, gridSize, gridSize);
  rect(4 * gridSize, 19 * gridSize, gridSize, gridSize);
  
  rect(30 * gridSize, 9 * gridSize, gridSize, gridSize);

  rect(19 * gridSize, 36 * gridSize, gridSize, gridSize);
  rect(19 * gridSize, 38 * gridSize, gridSize, gridSize);
}