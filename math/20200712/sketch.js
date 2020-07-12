const CANVAS_SIZE = 500;
let creal = 0;
let cimag = 1.25;

function setup() {
  let ctx = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  background(0);
  noStroke();

  for(let y = 0; y < 250; y++) {
    for(let x = 0; x < 250; x++) {
      let cx = -2.5 + x/50;
      let cy = -2.5 + y/50;
      let i = 0;

      do {
        let xt = cx * cx - cy * cy + creal;
        cy = 2 * cx * cy + cimag;
        cx = xt;
        i++;
      }
      while((cx * cx + cy * cy < 4) && i < 255);

      i = i.toString(16);
      fill('#' + i + i + i);
      rect(x * 2, y * 2, 2, 2);
    }
  }
}
