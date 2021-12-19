let graphics = [];
let graphicIndex = 0;

function setup() {
  createCanvas(495, 495);
  graphics.push(new Number16());
  graphics.push(new Number17());
  graphics.push(new Number18());
  switchGraphic();
}

class Base {
  constructor() {
    this.gridNumber = 45;
    this.gridSize = width / this.gridNumber;
  }

  draw() {
    background(255);
    noStroke();
    fill(0);
    for(let j=0; j<this.gridNumber; j++) {
      for(let i=0; i<this.gridNumber; i++) {
        if(i%2 == 0 || j%2 == 0) {
          rect(i * this.gridSize, j * this.gridSize, this.gridSize, this.gridSize);
        }
      }
    }
  }

  plot(x, y) {
    fill(255);
    rect(x * this.gridSize, y * this.gridSize , this.gridSize, this.gridSize);
  }
}

class Number16 extends Base {
  draw() {
    super.draw();

    this.plot(9, 16);
    this.plot(9, 18);
    this.plot(10, 15);
    this.plot(10, 19);
    this.plot(8, 17);

    this.plot(23, 14);
    this.plot(24, 15);
    this.plot(26, 15);
    this.plot(27, 16);
    this.plot(24, 15);

    this.plot(17, 22);
    this.plot(17, 24);
    this.plot(16, 23);
    this.plot(18, 23);

    this.plot(37, 20);
    this.plot(38, 21);
    this.plot(36, 21);
    this.plot(36, 21);
    this.plot(36, 23);
    this.plot(38, 23);
    this.plot(37, 24);

    this.plot(24, 29);
    this.plot(25, 28);
    this.plot(26, 27);
    this.plot(28, 27);
    this.plot(27, 28);
    this.plot(26, 29);

    this.plot(4, 31);
    this.plot(6, 31);
    this.plot(3, 32);
    this.plot(4, 33);
    this.plot(5, 34);
  }
}

class Number17 extends Base {
  draw() {
    super.draw();

    this.plot(15, 0);
    this.plot(16, 1);
    this.plot(17, 2);
    this.plot(18, 3);
    this.plot(19, 4);
    this.plot(20, 5);
    this.plot(21, 6);
    this.plot(22, 7);
    this.plot(23, 8);
    this.plot(24, 9);
    this.plot(25, 10);

    this.plot(28, 23);
    this.plot(29, 22);
    this.plot(30, 21);
    this.plot(32, 21);
    this.plot(33, 20);
    this.plot(34, 19);
    this.plot(36, 19);
    this.plot(38, 19);
    this.plot(39, 18);
    this.plot(40, 17);
    this.plot(42, 17);
    this.plot(44, 17);

    this.plot(11, 28);
    this.plot(11, 30);
    this.plot(11, 32);
    this.plot(11, 34);
    this.plot(11, 36);
    this.plot(11, 38);
    this.plot(11, 40);
    this.plot(11, 42);
    this.plot(11, 44);
  }
}

class Number18 extends Base {
  draw() {
    super.draw();

    this.plot(15, 14);
    this.plot(15, 16);
    this.plot(16, 13);
    this.plot(16, 15);
    this.plot(16, 17);

    this.plot(25, 14);
    this.plot(25, 16);

    this.plot(33, 14);
    this.plot(33, 16);
    this.plot(34, 17);

    this.plot(40, 13);
    this.plot(41, 14);
    this.plot(41, 16);
    this.plot(42, 13);
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