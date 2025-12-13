let i = 0;
let j = 0;
let c;

function setup() {
  createCanvas(360, 640);
  noStroke();
  frameRate(15);
  c = color(0, 0, 255);
}

function draw() {
  fill(c);
  rect(0, i * 20, width, 20);

  for(let k = 0; k < 18; k++) {
    j = floor(random(1, width / 20) % (width / 20));
    rect(j * 20, (i + 1) * 20, 20, 20);
  }

  for(k = 0; k < 5; k++) {
    j = floor(random(1, width / 20) % (width / 20));
    rect(j * 20, (i + 2) * 20, 20, 20);
  }
  i++;

  if(i > height / 20) {
    i = 0;
    c = color(random(255), random(255), random(255));
  }
}