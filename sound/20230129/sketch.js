const play = document.getElementById("play");
const stop = document.getElementById("stop");
let osc;

play.addEventListener("click", () => {
  // The AudioContext must be resumed (or created)
  // after a user gesture on the page
  if (!osc) {
    audioCtx = new AudioContext();
    osc = createOsc(audioCtx);
    osc.connect(audioCtx.destination);
    osc.start();
  }
});

stop.addEventListener("click", () => {
  if (osc) {
    osc.stop();
    osc = null;
  }
});

// When an oscillator is stopped, it can't be restarted.
// It must be recreated and then started.
const createOsc = audioCtx => {
  const osc = audioCtx.createOscillator();
  osc.type = 'sine';
  return osc;
};