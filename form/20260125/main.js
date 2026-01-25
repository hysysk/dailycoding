const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const line = (x0, y0, x1, y1) => {
  let distanceFromLine;
  let minX, maxX, minY, maxY;
  let slope, intercept = 0;
  let isVertical;

  minX = Math.min(x0, x1);
  maxX = Math.max(x0, x1);
  minY = Math.min(y0, y1);
  maxY = Math.max(y0, y1);

  isVertical = Math.abs(x0 - x1) === 0;

  if (!isVertical) {
    slope = (y0 - y1) / (x0 - x1);
    intercept = y0 - slope * x0;
  } else {
    slope = Number.POSITIVE_INFINITY; // Vertical
  }

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      if (isVertical) {
        distanceFromLine = Math.abs(x - x0);
      } else {
        distanceFromLine = Math.abs((slope * x) + intercept - y);
      }
      if (distanceFromLine <= 1) {
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
};

for (let i = 0; i < 100; i++) {
  let x0 = Math.random() * 500;
  let y0 = Math.random() * 500;
  let x1 = Math.random() * 500;
  let y1 = Math.random() * 500;
  line(x0, y0, x1, y1);
}