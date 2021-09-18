function setup() {
  createCanvas(500, 500);

  let y1 = 0, y2 = height;
  for (let a = 1; a < width; a += 62) {
    for(let b = 1; b < width; b += 62) {
      line(a, y1, b, y2);
    }
  }
}