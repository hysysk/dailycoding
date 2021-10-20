let graphics = [];
let graphicIndex = 0;

function setup() {
  createCanvas(500, 500);
  graphics.push(new Number10());
  graphics.push(new Number11());
  graphics.push(new Number12());
  switchGraphic();
}

function draw() {

}

class Base {
  constructor() {
    this.ellipseSize = 50;
    ellipseMode(CORNER);
  }
  draw() {
    background(0);
    noStroke();
    fill(255);
  }
}

class Number10 extends Base {
  draw() {
    super.draw();

    ellipse(6 * this.ellipseSize, 0, this.ellipseSize, this.ellipseSize);
    ellipse(6 * this.ellipseSize, 1 * this.ellipseSize, this.ellipseSize, this.ellipseSize);
    ellipse(6 * this.ellipseSize, 2 * this.ellipseSize, this.ellipseSize, this.ellipseSize);
    ellipse(6 * this.ellipseSize, 3 * this.ellipseSize, this.ellipseSize, this.ellipseSize);
    ellipse(6 * this.ellipseSize, 5 * this.ellipseSize, this.ellipseSize, this.ellipseSize);
    ellipse(6 * this.ellipseSize, 6 * this.ellipseSize, this.ellipseSize, this.ellipseSize);

    ellipse(2 * this.ellipseSize, 3 * this.ellipseSize, this.ellipseSize, this.ellipseSize);
    ellipse(4 * this.ellipseSize, 3 * this.ellipseSize, this.ellipseSize, this.ellipseSize);
    ellipse(5 * this.ellipseSize, 3 * this.ellipseSize, this.ellipseSize, this.ellipseSize);
    ellipse(9 * this.ellipseSize, 3 * this.ellipseSize, this.ellipseSize, this.ellipseSize);
  }
}

class Number11 extends Base {
  draw() {
    super.draw();

    ellipse(this.ellipseSize, 3 * this.ellipseSize, this.ellipseSize, this.ellipseSize);
    ellipse(this.ellipseSize, 4 * this.ellipseSize, this.ellipseSize, this.ellipseSize);
    ellipse(this.ellipseSize, 5 * this.ellipseSize, this.ellipseSize, this.ellipseSize);
    ellipse(2 * this.ellipseSize, 3 * this.ellipseSize, this.ellipseSize, this.ellipseSize);
    ellipse(2 * this.ellipseSize, 5 * this.ellipseSize, this.ellipseSize, this.ellipseSize);
    ellipse(3 * this.ellipseSize, 5 * this.ellipseSize, this.ellipseSize, this.ellipseSize);

    ellipse(4 * this.ellipseSize, 9 * this.ellipseSize, this.ellipseSize, this.ellipseSize);
    ellipse(5 * this.ellipseSize, 9 * this.ellipseSize, this.ellipseSize, this.ellipseSize);
    ellipse(5 * this.ellipseSize, 8 * this.ellipseSize, this.ellipseSize, this.ellipseSize);
    ellipse(6 * this.ellipseSize, 9 * this.ellipseSize, this.ellipseSize, this.ellipseSize);
    ellipse(6 * this.ellipseSize, 8 * this.ellipseSize, this.ellipseSize, this.ellipseSize);
    ellipse(6 * this.ellipseSize, 7 * this.ellipseSize, this.ellipseSize, this.ellipseSize);

    ellipse(6 * this.ellipseSize, 2 * this.ellipseSize, this.ellipseSize, this.ellipseSize);
    ellipse(7 * this.ellipseSize, 2 * this.ellipseSize, this.ellipseSize, this.ellipseSize);
    ellipse(8 * this.ellipseSize, 2 * this.ellipseSize, this.ellipseSize, this.ellipseSize);
    ellipse(7 * this.ellipseSize, 3 * this.ellipseSize, this.ellipseSize, this.ellipseSize);
    ellipse(8 * this.ellipseSize, 3 * this.ellipseSize, this.ellipseSize, this.ellipseSize);
    ellipse(7 * this.ellipseSize, 4 * this.ellipseSize, this.ellipseSize, this.ellipseSize);

  }
}

class Number12 extends Base {
  draw() {
    super.draw();
    
    ellipse(260, 10, this.ellipseSize, this.ellipseSize);
    ellipse(312, 92, this.ellipseSize, this.ellipseSize);
    ellipse(215, 118, this.ellipseSize, this.ellipseSize);
    ellipse(278, 140, this.ellipseSize, this.ellipseSize);
    ellipse(178, 160, this.ellipseSize, this.ellipseSize);
    ellipse(232, 172, this.ellipseSize, this.ellipseSize);
    
    ellipse(198, 238, this.ellipseSize, this.ellipseSize);

    ellipse(400, 265, this.ellipseSize, this.ellipseSize);
    ellipse(342, 298, this.ellipseSize, this.ellipseSize);
    ellipse(377, 338, this.ellipseSize, this.ellipseSize);

    ellipse(32, 388, this.ellipseSize, this.ellipseSize);
  }
}

function switchGraphic() {
  graphics[graphicIndex%graphics.length].draw();
  graphicIndex++;
}

function mouseReleased() {
  switchGraphic();
}

function touchEnded() {
  switchGraphic();
}