const MODULO = 4;
const CANVAS_SIZE = 100;
const ELEMENTS = [0, 1, 2, 3];
const CELL_SIZE = CANVAS_SIZE/ELEMENTS.length;

function setup() {
  let ctx = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  background(255);
  noStroke();
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
        case 0:
          vertex(i * CELL_SIZE, j * CELL_SIZE);
          vertex((i+1) * CELL_SIZE, (j+1) * CELL_SIZE);
          vertex(i * CELL_SIZE, (j+1) * CELL_SIZE);
          break;
        case 1:
          vertex((i+1) * CELL_SIZE, j * CELL_SIZE);
          vertex((i+1) * CELL_SIZE, (j+1) * CELL_SIZE);
          vertex(i * CELL_SIZE, (j+1) * CELL_SIZE);
          break;
        case 2:
          vertex(i * CELL_SIZE, j * CELL_SIZE);
          vertex((i+1) * CELL_SIZE, j * CELL_SIZE);
          vertex(i * CELL_SIZE, (j+1) * CELL_SIZE);
          break;
        case 3:
          vertex(i * CELL_SIZE, j * CELL_SIZE);
          vertex((i+1) * CELL_SIZE, j * CELL_SIZE);
          vertex((i+1) * CELL_SIZE, (j+1) * CELL_SIZE);
          break;
        default:
          console.log("undefined shape id", id);
      }
      endShape(CLOSE);
    }
  }
}
