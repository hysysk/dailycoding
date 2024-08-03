const FRAME_RATE = 30;

const TIMELINE = [
  {
    duration: 500,
    from: { x: 250, y: -50, w: 100, h: 100 },
    to: { x: 250, y: 400, w: 100, h: 100 },
    easing: 'cubicOut'
  }
];

const TIMELINE2 = [
  {
    delay: 500,
    duration: 1000,
    from: { x: 250, y: -50, w: 100, h: 100 },
    to: { x: 250, y: 250, w: 100, h: 100 },
    easing: 'cubicOut'
  },
  {
    duration: 750,
    from: { x: 250, y: 250, w: 100, h: 100 },
    to: { x: 100, y: 250, w: 100, h: 100 },
    easing: 'expOut'
  },
  {
    duration: 1000,
    from: { x: 100, y: 250, w: 100, h: 100 },
    to: { x: 100, y: 400, w: 100, h: 100 },
    easing: 'cubicOut'
  }
];

const TIMELINE3 = [
  {
    delay: 1000,
    duration: 500,
    from: { x: 250, y: -50, w: 100, h: 100 },
    to: { x: 250, y: 100, w: 100, h: 100 },
    easing: 'cubicOut'
  },
  {
    duration: 1000,
    from: { x: 250, y: 100, w: 100, h: 100 },
    to: { x: 400, y: 100, w: 100, h: 100 },
    easing: 'expOut'
  },
  {
    duration: 1000,
    from: { x: 400, y: 100, w: 100, h: 100 },
    to: { x: 400, y: 400, w: 100, h: 100 },
    easing: 'cubicOut'
  }
];

class AnimationObject {
  constructor(timeline) {
    this.timeLineIndex = 0;
    this.timeline = timeline;
    this.completed = false;
    this.configure(this.timeline[0]);
  }

  configure(settings) {
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
      this.timeLineIndex++;
      if (this.timeLineIndex < this.timeline.length) {
        this.configure(this.timeline[this.timeLineIndex]);
      } else {
        this.completed = true;
      }
    } else {
      this.counter++;
    }
  }

  draw() {
    if (this.completed) {
      fill(0, 0, 255);
    } else {
      fill(0);
    }
    rect(this.x, this.y, this.w, this.h);
  }
}

const ANIMATIONS = [TIMELINE, TIMELINE2, TIMELINE3];
let objs = [];

function setup() {
  frameRate(FRAME_RATE);
  createCanvas(500, 500);
  noStroke();
  rectMode(CENTER);
  for (let i = 0; i < ANIMATIONS.length; i++) {
    objs.push(new AnimationObject(ANIMATIONS[i]));
  }
}

function draw() {
  background(255);

  for (let i = 0; i < objs.length; i++) {
    objs[i].update();
    objs[i].draw();
  }
}

function msec2frames(duration) {
  return FRAME_RATE * duration / 1000;
}
