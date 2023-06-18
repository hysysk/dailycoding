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

function drawTriangle(triangle) {
  let itinerary = [0, 1, 2, 0];
  drawLines(triangle, itinerary);
}

drawTriangle(pointsToTriangle({ x: 50, y: 100 }, { x: 250, y: 450 }, { x: 450, y: 180 }));