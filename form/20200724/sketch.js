let graphics = [];
let graphicIndex = 0;

function setup() {
  createCanvas(500, 500);
  graphics.push(new Number4());
  graphics.push(new Number5());
  graphics.push(new Number6());
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

class Number4 extends Base {
  draw() {
    super.draw();
    ellipse(width/2, height/2, 4, 4);
  }
}

class Number5 extends Base {
  draw() {
    super.draw();
    ellipse(width/2, height/2 , 10, 10);
  }
}

class Number6 extends Base {
  draw() {
    super.draw();
    let grid = 20;
    let margin = width / (grid+1);
    for(let i=0; i<grid; i++) {
      for(let j=0; j<grid; j++) {
        ellipse((i+1) * margin, (j+1) * margin, 10, 10);
      }
    }
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