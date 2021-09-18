function setup() {
  createCanvas(500, 500);

  for (let i = 0; i < width + 1; i += 20) {
    line(0, 0, i, height);
    line(0, 0, width, height - i);
  }

  for (let i = 0; i < width + 1; i += 20) {
    line(width, height, 0, height - i);
    line(width, height, width - i, 0);
  }
}