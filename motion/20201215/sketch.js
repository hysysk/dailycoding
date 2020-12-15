let rects = [];

function setup() {
  createCanvas(500, 500);
  noStroke();
  fill(0);
  for (let i = 0; i < 25; i++) {
    rects.push(
      new Rectangle(int(i % 5) * 100, int(i / 5) * 100, 80, 20, random(TWO_PI))
    );
  }
}

function draw() {
  background(255);
  push();
  translate(40, 30);
  for (let i = 0; i < 25; i++) {
    rects[i].update();
    rects[i].draw();
  }
  pop();
}

class Rectangle {
  constructor(x, y, w, h, a) {
    this.x = x - w / 2;
    this.currentX = this.x;
    this.y = y - h / 2;
    this.currentY = this.y;
    this.a = a;
    this.currentA = this.a;
    this.w = w;
    this.h = h;
    this.noiseX = random(10);
    this.noiseY = random(5);
    this.noiseA = random(20);
  }

  update() {
    this.noiseX += 0.02;
    this.noiseY += 0.005;
    this.noiseA += 0.002;
    this.currentX = this.x + noise(this.noiseX) * 20;
    this.currentY = this.y + noise(this.noiseY) * 30;
    this.currentA = this.a + noise(this.noiseA) * 5;
  }

  draw() {
    push();
    translate(this.currentX + this.w / 2, this.currentY + this.h / 2);
    rotate(this.currentA);
    translate(-this.currentX - this.w / 2, -this.currentY - this.h / 2);
    rect(this.currentX, this.currentY, this.w, this.h);
    pop();
  }
}
