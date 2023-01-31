const play = document.getElementById("play");
const freq = document.getElementById("freq");
let audioCtx, osc;

play.addEventListener("click", () => {
  // The AudioContext must be resumed (or created)
  // after a user gesture on the page
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }

  if (!osc) {
    osc = createOsc();
    osc.start();
  } else {
    osc.stop();
    osc = null;
  }
});

setInterval(() => {
  if (osc) {
    osc.frequency.value = freq.value;
  }
}, 30);

// When an oscillator is stopped, it can't be restarted.
// It must be recreated and then started.
const createOsc = () => {
  const tmpOsc = audioCtx.createOscillator();
  tmpOsc.type = 'sine';
  tmpOsc.connect(audioCtx.destination);
  return tmpOsc;
};