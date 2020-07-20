function setup() {
  createCanvas(500, 500);
  background(255);

  const REPITITION = floor((width*height)*0.7);

  for(i=0; i<REPITITION; i++) {
    point(random(width), random(height));
  }
}