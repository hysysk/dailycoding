var gridSize = 50;

var points = [];
for (var j = 1; j < 10; j++) {
  for (var i = 1; i < 10; i++) {
    var gridPosition = new Point(i * gridSize, j * gridSize);
    points.push(gridPosition);
    // var gridPoint = new Shape.Circle(gridPosition, 2);
    // gridPoint.fillColor = 'yellow';
  }
}

var maxPointsNumber = 10;
var minPointsNumber = 2;

var repetition = Math.floor(Math.random() * (maxPointsNumber - minPointsNumber)) + minPointsNumber;
var counter = 0;

while (counter < repetition) {
  var a = points[Math.floor(Math.random() * points.length)];
  var b = points[Math.floor(Math.random() * points.length)];
  var vector = b - a;

  if (a.x !== b.x && a.y !== b.y) {
    var ellipse = new Shape.Ellipse(
      new Point(a),
      new Point(b)
    );
    ellipse.rotation = vector.angle
    ellipse.strokeColor = 'black';
    counter++;
  }
}
