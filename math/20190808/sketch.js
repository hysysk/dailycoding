const CANVAS_SIZE = 100;
const MODULO = 4;
const CELL_SIZE = CANVAS_SIZE/MODULO;

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
  for(let j=0; j<MODULO; j++) {
    for(let i=0; i<MODULO; i++) {
      let id = (i + j) % MODULO;
      push();
      translate(CELL_SIZE/2+i*CELL_SIZE, CELL_SIZE/2+j*CELL_SIZE);
      let angle = HALF_PI * id;
      rotate(angle);
      translate(-CELL_SIZE/2, -CELL_SIZE/2);
      arc(0, 0, CELL_SIZE*2, CELL_SIZE*2, 0, HALF_PI);
      // rect(0, 0, CELL_SIZE/2, CELL_SIZE/2);
      // rect(0, 0, CELL_SIZE/2, CELL_SIZE);
      // beginShape();
      // vertex(0, 0);
      // vertex(CELL_SIZE, 0);
      // vertex(0, CELL_SIZE);
      // endShape(CLOSE);
      pop();
    }
  }
}
