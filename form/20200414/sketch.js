var path = new Path();
path.fillColor = 'black';

var gridSize = 50;

var points = [];
for(var j=1; j<10; j++) {
  for(var i=1; i<10; i++) {
    var gridPosition = new Point(i * gridSize, j * gridSize);
    points.push(gridPosition);
    // var gridPoint = new Shape.Circle(gridPosition, 2);
    // gridPoint.fillColor = 'yellow';
  }
}

var minPointsNumber = 6;

var repetition = Math.floor(Math.random() * (points.length - minPointsNumber)) + minPointsNumber;
var counter = 0;

while(counter < repetition) {
  path.add(points[Math.floor(Math.random() * points.length)]);
  counter++;
}

path.closed = true;
path.smooth();
