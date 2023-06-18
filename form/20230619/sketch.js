const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function pointsToTriangle(point1, point2, point3) {
  let triangle = [point1, point2, point3];
  return triangle;
}

function fillTriangle(triangle) {
  ctx.beginPath();
  ctx.moveTo(triangle[0].x, triangle[0].y);
  ctx.lineTo(triangle[1].x, triangle[1].y);
  ctx.lineTo(triangle[2].x, triangle[2].y);
  ctx.closePath();
  ctx.fill();
}

function drawCircle(center, radius) {
  ctx.beginPath();
  ctx.arc(center[0], center[1], radius, 0, Math.PI * 2);
  ctx.stroke();
}

function triangleToCircumcenter(triangle) {
  let x = math.complex(triangle[0].x, triangle[0].y);
  let y = math.complex(triangle[1].x, triangle[1].y);
  let z = math.complex(triangle[2].x, triangle[2].y);
  // w = z - x
  let w = math.subtract(z, x);
  // w = (y - x) / w
  w = math.divide(w, math.subtract(y, x));
  // c = (x - y) * (w - abs(w) ** 2) / 2j / w.imag - x
  let c = math.subtract(math.divide(math.divide(math.multiply(math.subtract(x, y), math.subtract(w, math.pow(w.abs(), 2))), math.complex(0, 2)), w.im), x);
  let radius = math.abs(math.add(c, x));
  return [[math.subtract(0, c.re), math.subtract(0, c.im)], radius];
}

for (let i = 0; i < 5; i++) {
  let triangle = pointsToTriangle({ x: Math.random() * 500, y: Math.random() * 500 }, { x: Math.random() * 500, y: Math.random() * 500 }, { x: Math.random() * 500, y: Math.random() * 500 });
  fillTriangle(triangle);
  let [center, radius] = triangleToCircumcenter(triangle);
  drawCircle(center, radius);
}