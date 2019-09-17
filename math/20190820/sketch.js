const CANVAS_SIZE = 501;
const MODULO = 4;
const CELL_SIZE = 100;

function setup() {
  let ctx = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  background(255);
  textSize(32);
  textAlign(CENTER);
  drawTable();
  drawPattern();
  // saveCanvas(ctx, 'sketch.png', 'png');
}

function drawTable() {
  for(let i=0; i<MODULO+1; i++) {
    for(let j=0; j<MODULO+1; j++) {
      stroke(0);
      fill(255);
      rect(i*CELL_SIZE, j*CELL_SIZE, CELL_SIZE, CELL_SIZE);
      fill(0);

      if(i == 0 && j == 0) {
        fill(200);
        stroke(0);
        rect(i*CELL_SIZE, j*CELL_SIZE, CELL_SIZE, CELL_SIZE);
        fill(0);
        noStroke();
        text("+", CELL_SIZE*0.5, CELL_SIZE*0.6);
      }

      if(j==0 && i != 0) {
        fill(200);
        stroke(0);
        rect(i*CELL_SIZE, j*CELL_SIZE, CELL_SIZE, CELL_SIZE);
        fill(0);
        noStroke();
        text(i-1, i * CELL_SIZE + CELL_SIZE*0.5, CELL_SIZE*0.6);
      }

      if(i==0 && j != 0) {
        fill(200);
        stroke(0);
        rect(i*CELL_SIZE, j*CELL_SIZE, CELL_SIZE, CELL_SIZE);
        fill(0);
        noStroke();
        text(j-1, CELL_SIZE*0.5, j * CELL_SIZE + CELL_SIZE*0.6);
      }
    }
  }
}

function drawPattern() {
  for(let j=0; j<MODULO; j++) {
    for(let i=0; i<MODULO; i++) {
      let id = (i + j) % MODULO;
      push();
      translate(CELL_SIZE*1.5+i*CELL_SIZE, CELL_SIZE*1.6+j*CELL_SIZE);
      noStroke();
      text(id, 0, 0);
      pop();
    }
  }
}
