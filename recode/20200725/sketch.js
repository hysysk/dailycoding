let graphics = [];
let graphicIndex = 0;

function setup() {
  createCanvas(500, 500);
  graphics.push(new Number7());
  graphics.push(new Number8());
  graphics.push(new Number9());
  switchGraphic();
}

function draw() {

}

class Base {
  draw() {
    background(255);
    stroke(0);
    noFill();
    rect(0, 0, width, height);
    noStroke();
    fill(0);
  }
}

class Number7 extends Base {
  draw() {
    super.draw();
    let grid = 19;
    let margin = width / (grid+1);
    for(let i=0; i<13; i++) {
      for(let j=0; j<14; j++) {
        ellipse((i+1) * margin, (j+1) * margin, 10, 10);
      }
    }

    ellipse(17 * margin, margin, 10, 10);

    for(let i=11; i<20; i++) {
      ellipse(17 * margin, i * margin, 10, 10);
    }
  }
}

class Number8 extends Base {
  draw() {
    super.draw();
    let grid = 19;
    let margin = width / (grid+1);
    
    ellipse(14 * margin, 3 * margin, 10, 10);
    ellipse(14 * margin, 14 * margin, 10, 10);
    ellipse(15 * margin, 14 * margin, 10, 10);
  }
}

class Number9 extends Base {
  draw() {
    super.draw();
    let grid = 19;
    let margin = width / (grid+1);

    ellipse(1 * margin, 10 * margin, 10, 10);
    ellipse(2 * margin, 10 * margin, 10, 10);
    ellipse(4 * margin, 10 * margin, 10, 10);
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