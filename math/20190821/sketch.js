const MODULO = 4;
const CANVAS_SIZE = 100;
const ROW = [0, 1, 2, 3];
const COL = [0, 1, 2, 3];
const COLOR = ["#7ecfc0", "#f2e3c9", "#ec8f6a", "#ef4b4b"];
// const COLOR = ["#000000"];
const CELL_SIZE = CANVAS_SIZE/MODULO;

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

      switch(id) {
        case 0:
          // fill(0);
          fill(COLOR[id]);
          noStroke();
          ellipse(i * CELL_SIZE + CELL_SIZE/2, j * CELL_SIZE + CELL_SIZE/2, CELL_SIZE*0.8, CELL_SIZE*0.8);
          break;
        case 1:
          // fill(0);
          fill(COLOR[id]);
          noStroke();
          push();
          translate(i * CELL_SIZE + CELL_SIZE/2, j * CELL_SIZE + CELL_SIZE/2 + 3);
          rotate(HALF_PI/3);
          beginShape();
          for(let k=0; k<360; k+=120) {
            let angle = radians(k);
            let x = CELL_SIZE/2 * cos(angle);
            let y = CELL_SIZE/2 * sin(angle);
            vertex(x, y);
          }
          endShape();
          pop();
          break;
        case 2:
          // fill(0);
          fill(COLOR[id]);
          noStroke();
          rectMode(CENTER);
          rect(i*CELL_SIZE + CELL_SIZE/2, j*CELL_SIZE + CELL_SIZE/2, CELL_SIZE*0.75, CELL_SIZE*0.75);
          break;
        case 3:
          noFill();
          // stroke(0);
          stroke(COLOR[id]);
          beginShape();
          vertex(i * CELL_SIZE + 4, j * CELL_SIZE + 4);
          vertex((i+1) * CELL_SIZE - 4, (j+1) * CELL_SIZE - 4);
          endShape();

          beginShape();
          vertex((i+1) * CELL_SIZE - 4, j * CELL_SIZE + 4);
          vertex(i * CELL_SIZE + 4, (j+1) * CELL_SIZE - 4);
          endShape();
          break;
        default:
          console.log("undefined shape id");
      }

    }
  }
}
