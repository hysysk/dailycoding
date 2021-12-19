function setup() {
  createCanvas(500, 500);
  background(0);
  stroke(255);

  randomDots(0, 0, 350, 300, 150);
  randomDots(40, 20, 350, 350, 400);
  randomDots(280, 0, 200, 200, 100);
  randomDots(220, 0, 300, 300, 80);
  randomDots(50, 50, 200, 200, 50);
  randomDots(150, 120, 350, 350, 80);

  strokeWeight(4);
  stroke(255);
  point(150, 145);
}

function normalizedRandom(){
  let s = 0;
  for(let i = 0; i < 3; i++) {
    s += Math.random();
  }
  return s / 3;
}

function randomDots(sx, sy, w, h, r, p) {
  push();
  translate(sx, sy);
  for(let i = 0; i < r; i++) {
    let x = normalizedRandom() * w;
    let y = normalizedRandom() * h;
    point(x, y);
  }
  pop();
}