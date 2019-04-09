const MODULO = 6;
const TEXT_SIZE = 24;
const CANVAS_SIZE = 100;
const ROW = [0, 1, 2, 3, 4, 5];
const COL = [0, 1, 2, 3, 4, 5];
const COLOR = ["#DD1E2F", "#EBB035", "#06A2CB",	"#218559", "#D0C6B1", "#192823"];
const CELL_SIZE = CANVAS_SIZE/ROW.length;
let debug = false;

function setup() {
  let ctx = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  background(255);
  noStroke();
  shuffleArray(ROW);
  shuffleArray(COL);
  shuffleArray(COLOR);
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
  background(255);
  for(let i=0; i<ROW.length; i++) {
    for(let j=0; j<COL.length; j++) {
      let id = (ROW[i] + COL[j]) % MODULO;
      fill(COLOR[id]);
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
          vertex((i+1) * CELL_SIZE, (j) * CELL_SIZE);
          vertex(i * CELL_SIZE, (j+1) * CELL_SIZE);
          break;
        case 3:
          vertex(i * CELL_SIZE, j * CELL_SIZE);
          vertex((i+1) * CELL_SIZE, j * CELL_SIZE);
          vertex((i+1) * CELL_SIZE, (j+1) * CELL_SIZE);
          break;
        case 4:
          vertex(i * CELL_SIZE, j * CELL_SIZE);
          vertex((i+1) * CELL_SIZE, j * CELL_SIZE);
          vertex((i+1) * CELL_SIZE, (j+1) * CELL_SIZE);
          vertex(i * CELL_SIZE, (j+1) * CELL_SIZE);
          break;
        case 5:
          ellipseMode(CORNER);
          ellipse(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE);
          break;
        default:
          console.log("undefined shape id");
      }
      endShape(CLOSE);
    }
  }
}