function setup() {
  createCanvas(500, 500);
  background(255);
  noFill();

  let a = -15;
  let b = 50;
  let c;
  if(a > b) {
    c = a;
  } else {
    c = b;
  }
  let hp = -100000;
  let lp = 100000;
  let dx = (b - a) / width;
  let y;
  for (let x = a; x < b; x += dx) {
    y = f(x);
    if (y > hp) {
      hp = y;
    }
    if (y < lp) {
      lp = y;
    }
  }

  let kx = width / (b - a);
  let ky = height / (hp - lp);
  let h = 0.5;
  let x1, x2, y1, y2;
  for (let x = a; x < b; x += dx) {
    y = f(x);
    let xx = int(kx * (x - a) + h);
    let yy = height - int(ky * (y - lp) + h);
    if (x == a) {
      x1 = xx;
      y1 = yy;
    } else {
      x2 = xx;
      y2 = yy;
      line(x1, y1, x2, y2);
      x1 = x2;
      y1 = y2;
    }
  }
  x1 = 0;
  y1 = height - int(ky * (-lp) + h);
  x2 = width;
  y2 = y1;
  if(y1 > 0 && y1 < width) {
    line(x1, y1, x2, y2);
  }
  x1 = int(kx * (-a) + h);
  y1 = 0;
  x2 = x1;
  y2 = height;
  if(x1 >= 0 && x1 <= width) {
    line(x1, y1, x2, y2);
  }
}

function f(x) {
  return exp(-0.1 * x) * cos(x);
}