const MODULO = 5;
const CANVAS_SIZE = 100;
const ROW = [1, 2, 3, 4];
const COL = [1, 2, 3, 4];
const COLOR = ["#3FFB75", "#111111", "#A59486",	"#111111"];
const CELL_SIZE = CANVAS_SIZE/ROW.length;

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
      let id = (ROW[i] * COL[j]) % MODULO;
      fill(COLOR[id-1]);
      beginShape();
      switch(id) {
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
          vertex(i * CELL_SIZE, (j+1) * CELL_SIZE);
          break;
        case 4:
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
