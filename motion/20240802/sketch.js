const FRAME_RATE = 30;

const MOTION = [
  {
    duration: 1000,
    from: { x: 100, y: 250, w: 50, h: 50 },
    to: { x: 400, y: 225, w: 100, h: 100 },
    easing: 'cubicOut'
  }
];

const MOTION2 = [
  {
    delay: 300,
    duration: 500,
    from: { x: 400, y: 0, w: 100, h: 100 },
    to: { x: 400, y: 400, w: 100, h: 100 },
    easing: 'linear'
  }
];

class AnimationObject {
  constructor(settings) {
    this.counter = 0;
    this.duration = msec2frames(settings.duration || 1000);
    this.delay = msec2frames(settings.delay || 0);
    this.delayCounter = 0;
    this.fromX = settings.from.x || 0;
    this.fromY = settings.from.y || 0;
    this.fromW = settings.from.w || 50;
    this.fromH = settings.from.h || 50;
    this.x = this.fromX;
    this.y = this.fromY;
    this.w = this.fromW;
    this.h = this.fromH;
    this.targetX = (settings.to.x - this.fromX) || 0;
    this.targetY = (settings.to.y - this.fromY) || 0;
    this.targetW = (settings.to.w - this.fromW) || 0;
    this.targetH = (settings.to.h - this.fromH) || 0;
    this.easing = settings.easing || 'linear';
    this.completed = false;
  }

  update() {
    if (this.delayCounter < this.delay) {
      this.delayCounter++;
      return;
    }

    let progress = this.counter / this.duration;
    this.x = this.fromX + Easing[this.easing](progress) * this.targetX;
    this.y = this.fromY + Easing[this.easing](progress) * this.targetY;
    this.w = this.fromW + Easing[this.easing](progress) * this.targetW;
    this.h = this.fromH + Easing[this.easing](progress) * this.targetH;

    if (progress >= 1) {
      this.completed = true;
    } else {
      this.counter++;
    }
  }
}

function setup() {
  frameRate(FRAME_RATE);
  createCanvas(500, 500);
  noStroke();
  ellipseMode(CENTER);
  rectMode(CENTER);
  obj = new AnimationObject(MOTION[0]);
  obj2 = new AnimationObject(MOTION2[0]);
}

function draw() {
  background(255);

  if (obj.completed) {
    fill(0, 0, 255);
  } else {
    fill(0);
  }
  ellipse(obj.x, obj.y, obj.w, obj.h);
  obj.update();

  if (obj2.completed) {
    fill(0, 0, 255);
  } else {
    fill(0);
  }
  rect(obj2.x, obj2.y, obj2.w, obj2.h);
  obj2.update();
}

function msec2frames(duration) {
  return FRAME_RATE * duration / 1000;
}
