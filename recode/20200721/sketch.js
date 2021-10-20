function setup() {
  createCanvas(500, 500);
  background(255);

  for(let j=0; j<height; j+=5) {
    for(let i=0; i<width; i+=5) {
      point(i + random(-2, 2), j + random(-2, 2));
    }
  }
}