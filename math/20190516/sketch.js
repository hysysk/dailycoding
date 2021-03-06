const CANVAS_SIZE = 100;
const MODULO = 4;
const CELL_SIZE = CANVAS_SIZE/MODULO;

function setup() {
  let ctx = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  background(255);
  noStroke();
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
      fill(0);
      push();
      translate(CELL_SIZE/2+i*CELL_SIZE, CELL_SIZE/2+j*CELL_SIZE);
      let angle = (2*Math.PI/MODULO) * id;
      rotate(angle);
      translate(-CELL_SIZE/2, -CELL_SIZE/2);
      beginShape();
      vertex(0, 0);
      vertex(CELL_SIZE, CELL_SIZE);
      vertex(0, CELL_SIZE);
      endShape(CLOSE);
      pop();
    }
  }
}
