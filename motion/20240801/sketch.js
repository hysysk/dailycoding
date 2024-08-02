const FRAME_RATE = 30;

const MOTION = [
  {
    duration: 1000,
    from: { x: 100, y: 250, w: 50, h: 50 },
    to: { x: 400, y: 225, w: 100, h: 100 },
    easing: 'cubicOut'
  }
];

class AnimationObject {
  constructor(settings) {
    this.counter = 0;
    this.duration = settings.duration || 1000;
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
    this.frames = msec2frames(this.duration);
  }

  update() {
    let progress = this.counter / this.frames;
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

let obj;

function setup() {
  frameRate(FRAME_RATE);
  createCanvas(500, 500);
  noStroke();
  ellipseMode(CENTER);
  obj = new AnimationObject(MOTION[0]);
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
}

function msec2frames(duration) {
  return FRAME_RATE * duration / 1000;
}
