const FRAME_RATE = 30;
const GRID_NUMBER = 5;
const TEXT_SIZE = 24;
const CANVAS_SIZE = 500;
const CELL_SIZE = CANVAS_SIZE/GRID_NUMBER;
let debug = false;

function setup() {
  frameRate(FRAME_RATE);
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  background(0);
  noStroke();
  textSize(TEXT_SIZE);
  textFont("monospace");
}

function draw() {
  background(0);
  for(let i=0; i<GRID_NUMBER; i++) {
    for(let j=0; j<GRID_NUMBER; j++) {
      let color = (i * j) % GRID_NUMBER;
      fill(map(color, 0, GRID_NUMBER-1, 0, 255));
      rect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      if(debug) {
        fill(0, 255, 0);
        text(color, i * CELL_SIZE, j * CELL_SIZE + TEXT_SIZE);
      }
    }
  }
}

function mouseReleased() {
  debug = !debug;
}

function touchEnded() {
  debug = !debug;
}
