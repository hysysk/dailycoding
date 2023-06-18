const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function pointsToTriangle(point1, point2, point3) {
  let triangle = [point1, point2, point3];
  return triangle;
}

function drawLines(listPoints, itinerary) {
  for (let i = 0; i < itinerary.length - 1; i++) {
    ctx.beginPath();
    ctx.moveTo(listPoints[itinerary[i]].x, listPoints[itinerary[i]].y);
    ctx.lineTo(listPoints[itinerary[i + 1]].x, listPoints[itinerary[i + 1]].y);
    ctx.stroke();
  }
}

function drawTriangle(triangle, center, radius) {
  let itinerary = [0, 1, 2, 0];
  drawLines(triangle, itinerary);
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

let triangle = pointsToTriangle({ x: 50, y: 100 }, { x: 250, y: 450 }, { x: 450, y: 180 });
drawTriangle(triangle);

let [center, radius] = triangleToCircumcenter(triangle);

ctx.beginPath();
ctx.arc(center[0], center[1], radius, 0, Math.PI * 2);
ctx.stroke();
ctx.beginPath();
ctx.arc(center[0], center[1], 4, 0, Math.PI * 2);
ctx.fill();