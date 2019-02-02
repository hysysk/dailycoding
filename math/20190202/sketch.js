const FRAME_RATE = 30;
const GRID_NUMBER = 5;
const TEXT_SIZE = 24;
const CANVAS_SIZE = 500;
const CELL_SIZE = CANVAS_SIZE/GRID_NUMBER;
let debug = false;

function setup() {
  frameRate(FRAME_RATE);
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  background(255);
  noStroke();
  textSize(TEXT_SIZE);
  textFont("monospace");
}

function draw() {
  background(255);
  for(let i=0; i<GRID_NUMBER; i++) {
    for(let j=0; j<GRID_NUMBER; j++) {
      fill(0);
      let id = (i + j) % GRID_NUMBER;
      beginShape();
      switch(id) {
        case 0:
          vertex(i * CELL_SIZE, j * CELL_SIZE);
          vertex((i+1) * CELL_SIZE, j * CELL_SIZE);
          vertex((i+1) * CELL_SIZE, (j+1) * CELL_SIZE);
          vertex(i * CELL_SIZE, (j+1) * CELL_SIZE);
          break;
        case 1:
          vertex(i * CELL_SIZE, j * CELL_SIZE);
          vertex((i+1) * CELL_SIZE, (j+1) * CELL_SIZE);
          vertex(i * CELL_SIZE, (j+1) * CELL_SIZE);
          break;
        case 2:
          vertex((i+1) * CELL_SIZE, j * CELL_SIZE);
          vertex((i+1) * CELL_SIZE, (j+1) * CELL_SIZE);
          vertex(i * CELL_SIZE, (j+1) * CELL_SIZE);
          break;
        case 3:
          vertex(i * CELL_SIZE, j * CELL_SIZE);
          vertex((i+1) * CELL_SIZE, j * CELL_SIZE);
          vertex(i * CELL_SIZE, (j+1) * CELL_SIZE);
          break;
        case 4:
          vertex(i * CELL_SIZE, j * CELL_SIZE);
          vertex((i+1) * CELL_SIZE, j * CELL_SIZE);
          vertex((i+1) * CELL_SIZE, (j+1) * CELL_SIZE);
          break;
        default:
          console.log("out of GRID_NUMBER");
      }
      endShape(CLOSE);
      if(debug) {
        fill(0, 255, 0);
        text(id, i * CELL_SIZE, j * CELL_SIZE + TEXT_SIZE);
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
