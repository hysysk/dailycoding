const FRAME_RATE = 30;

function setup() {
  frameRate(FRAME_RATE);
  createCanvas(500, 500);
  background(0);

  let sp = [];
  for(let i=0; i<20; i++) {
    let a = TWO_PI/20 * i;
    let len = random(80, 300)
    let x = cos(a) * len + width/2;
    let y = sin(a) * len + height/2;
    sp.push([x, y]);
  }
  let cp = [[100, 100], [400, 100], [400, 400], [100, 400]];
  let clipped = clip(sp, cp);
  drawPolygon(sp);
  drawPolygon(cp);
  fill(0);
  drawPolygon(clipped);
}

// Sutherland-Hodgeman polygon clipping
// https://rosettacode.org/wiki/Sutherland-Hodgman_polygon_clipping
// GNU Free Documentation License 1.2 
// http://www.gnu.org/licenses/fdl-1.2.html
function clip(subjectPolygon, clipPolygon) {
  let cp1, cp2, s, e;

  let inside = function(p) {
    return (cp2[0] - cp1[0]) * (p[1] - cp1[1]) > (cp2[1] - cp1[1]) * (p[0] - cp1[0]);
  };

  let intersection = function() {
    let dc = [cp1[0] - cp2[0], cp1[1] - cp2[1]],
    dp = [s[0] - e[0], s[1] - e[1]],
    n1 = cp1[0] * cp2[1] - cp1[1] * cp2[0],
    n2 = s[0] * e[1] - s[1] * e[0],
    n3 = 1.0 / (dc[0] * dp[1] - dc[1] * dp[0]);

    return [(n1 * dp[0] - n2 * dc[0]) * n3, (n1 * dp[1] - n2 * dc[1]) * n3];
  };

  let outputList = subjectPolygon;
  cp1 = clipPolygon[clipPolygon.length-1];
  for(let j=0; j<clipPolygon.length; j++) {
    cp2 = clipPolygon[j];
    let inputList = outputList;
    outputList = [];
    s = inputList[inputList.length - 1];
    for(let i=0; i<inputList.length; i++) {
      e = inputList[i];
      if(inside(e)) {
        if(!inside(s)) {
          outputList.push(intersection());
        }
        outputList.push(e);
      } else if(inside(s)) {
        outputList.push(intersection());
      }
      s = e;
    }
    cp1 = cp2;
  }
  return outputList;
}

function drawPolygon(polygon) {
  beginShape();
  for(let i=0; i<polygon.length; i++) {
    vertex(polygon[i][0], polygon[i][1]);
  }
  endShape(CLOSE);
}

function mouseReleased() {
  setup();
}

function touchEnded() {
  setup();
}
