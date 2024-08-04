const FRAME_RATE = 30;

const TIMELINE = [
  {
    duration: 500,
    from: { x: 250, y: -50, w: 150, h: 150 },
    to: { x: 250, y: 400, w: 150, h: 150 },
    easing: 'cubicOut',
    draw: function () {
      fill(0);
      rect(this.x, this.y, this.w, this.h, 20);
    }
  }
];

const TIMELINE2 = [
  {
    delay: 300,
    duration: 1000,
    from: { x: 250, y: -150, w: 150, h: 150 },
    to: { x: 250, y: 250, w: 150, h: 150 },
    easing: 'cubicOut',
    draw: function () {
      fill(0);
      ellipse(this.x, this.y, this.w, this.h);
    }
  },
  {
    duration: 750,
    from: { x: 250, y: 250, w: 150, h: 150 },
    to: { x: 100, y: 250, w: 150, h: 150 },
    easing: 'expOut',
    draw: function () {
      fill(0);
      ellipse(this.x, this.y, this.w, this.h);
    }
  },
  {
    duration: 1000,
    from: { x: 100, y: 250, w: 150, h: 150 },
    to: { x: 100, y: 400, w: 150, h: 150 },
    easing: 'cubicOut',
    draw: function () {
      fill(0);
      ellipse(this.x, this.y, this.w, this.h);
    }
  }
];

const TIMELINE3 = [
  {
    delay: 2000,
    duration: 500,
    from: { x: 250, y: -150, w: 150, h: 150 },
    to: { x: 250, y: 100, w: 150, h: 150 },
    easing: 'cubicOut',
    draw: function () {
      fill(0);
      ellipse(this.x, this.y, this.w, this.h);
    }
  },
  {
    duration: 1000,
    from: { x: 250, y: 100, w: 150, h: 150 },
    to: { x: 400, y: 100, w: 150, h: 150 },
    easing: 'expOut',
    draw: function () {
      fill(0);
      ellipse(this.x, this.y, this.w, this.h);
    }
  },
  {
    duration: 1000,
    from: { x: 400, y: 100, w: 150, h: 150 },
    to: { x: 400, y: 100, w: 150, h: 150 },
    easing: 'cubicOut',
    draw: function () {
      fill(0);
      ellipse(this.x, this.y, this.w, this.h);
    }
  }
];

const TIMELINE4 = [
  {
    delay: 3000,
    duration: 1000,
    from: { x: 175, y: -150, w: 300, h: 300 },
    to: { x: 175, y: 175, w: 300, h: 300 },
    easing: 'cubicOut',
    draw: function () {
      fill(0);
      rect(this.x, this.y, this.w, this.h, 20);
    }
  }
];

const TIMELINE5 = [
  {
    delay: 1200,
    duration: 500,
    from: { x: 400, y: -150, w: 150, h: 300 },
    to: { x: 400, y: 325, w: 150, h: 300 },
    easing: 'cubicOut',
    draw: function () {
      fill(0);
      rect(this.x, this.y, this.w, this.h, 20);
    }
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
    this.progress = 0;
    this.draw = settings.draw || function () { };
  }

  update() {
    if (this.delayCounter < this.delay) {
      this.delayCounter++;
      return;
    }

    this.progress = this.counter / this.duration;
    this.x = this.fromX + Easing[this.easing](this.progress) * this.targetX;
    this.y = this.fromY + Easing[this.easing](this.progress) * this.targetY;
    this.w = this.fromW + Easing[this.easing](this.progress) * this.targetW;
    this.h = this.fromH + Easing[this.easing](this.progress) * this.targetH;

    if (this.progress >= 1) {
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
    this.draw(this.progress);
  }
}

const ANIMATIONS = [TIMELINE, TIMELINE2, TIMELINE3, TIMELINE4, TIMELINE5];
let objs = [];

function setup() {
  frameRate(FRAME_RATE);
  createCanvas(500, 500);
  noStroke();
  rectMode(CENTER);
  ellipseMode(CENTER);
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
