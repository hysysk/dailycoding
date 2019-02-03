const FRAME_RATE = 30;
const MODULO = 5;
const TEXT_SIZE = 24;
const CANVAS_SIZE = 100;
const ELEMENTS = [0, 1, 2, 3, 4];
const CELL_SIZE = CANVAS_SIZE/ELEMENTS.length;
let debug = false;

function setup() {
  frameRate(FRAME_RATE);
  let ctx = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  background(255);
  noStroke();
  textSize(TEXT_SIZE);
  textFont("monospace");
  shuffleArray(ELEMENTS);
  drawPattern();
  let body = ctx.parent();
  let img = new Image();
  img.src = ctx.elt.toDataURL("image/png");
  body.style.background = 'url(' + img.src + ')';
}

function shuffleArray(array) {
  let currentIndex = array.length;
  let tmp, randomIndex;
  while(currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    tmp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tmp;
  }
  return array;
}

function drawPattern() {
  for(let i=0; i<ELEMENTS.length; i++) {
    for(let j=0; j<ELEMENTS.length; j++) {
      fill(0);
      let id = (ELEMENTS[i] + ELEMENTS[j]) % MODULO;
      beginShape();
      switch(id) {
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
          console.log("out of GRID_NUMBER", id);
      }
      endShape(CLOSE);
    }
  }
}
