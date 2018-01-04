const FRAME_RATE = 30;
const ANIMATIONS = [
  {
    duration: 1000,
    update: function(p) {
      let y = height + 25 - Easing.cubicOut(p) * (height/2 + 25);
      ellipse(width/2, y, 50, 50);
    }
  },
  {
    duration: 500,
    update: function(p) {
      let s = 50 + Easing.cubicInOut(p) * 150;
      ellipse(width/2, height/2, s, s);
    }
  },
  {
    duration: 800,
    update: function(p) {
      let y = height/2 - Easing.cubicIn(p) * (height/2 + 100);
      ellipse(width/2, y, 200, 200);
    }
  }
];

var animationIndex = 0;
var counter = 0;

function setup() {
  frameRate(FRAME_RATE);
  createCanvas(500, 500);
  noStroke();
}

function draw() {
  background(0);

  let frames = msec2frames(ANIMATIONS[animationIndex].duration);
  let progress = counter % frames / frames;
  ANIMATIONS[animationIndex].update(progress);

  counter++;

  if(counter % frames == 0) {
    counter = 0;
    animationIndex++;

    if(animationIndex == ANIMATIONS.length) {
      animationIndex = 0;
    }
  }
}

function msec2frames(duration) {
  return FRAME_RATE * duration / 1000;
}
