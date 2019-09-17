const MODULO = 5;
const CANVAS_SIZE = 100;
const ROW = [1, 2, 3, 4];
const COL = [1, 2, 3, 4];
const CELL_SIZE = CANVAS_SIZE/ROW.length;

function setup() {
  let ctx = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  background(255);
  noStroke();
  fill(0);
  drawPattern();
  let body = ctx.parent();
  let img = new Image();
  img.src = ctx.elt.toDataURL("image/png");
  body.style.background = 'url(' + img.src + ')';
}

function drawPattern() {
  for(let j=0; j<ROW.length; j++) {
    for(let i=0; i<COL.length; i++) {
      let id = (COL[i] * ROW[j]) % MODULO;
      push();
      translate(CELL_SIZE/2+i*CELL_SIZE, CELL_SIZE/2+j*CELL_SIZE);
      let angle = HALF_PI * (id-1);
      rotate(angle);
      translate(-CELL_SIZE/2, -CELL_SIZE/2);
      arc(0, 0, CELL_SIZE*2, CELL_SIZE*2, 0, HALF_PI);
      pop();
    }
  }
}
