const playButton = document.getElementById("play");
const freqSlider = document.getElementById("freq-slider");
let audioCtx;
let filter;
let vca;

playButton.addEventListener("click", () => {
  // The AudioContext must be resumed (or created)
  // after a user gesture on the page
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  play(0, 523.25, 0.28);
  play(0.3, 587.33, 0.28);
  play(0.6, 659.25, 0.28);
  play(0.9, 698.46, 0.28);
  play(1.2, 783.99, 0.28);
  play(1.5, 880.00, 0.28);
  play(1.8, 987.77, 0.28);
  play(2.1, 1046.50, 0.28);
  playButton.disabled = true;
  setTimeout(() => {
    playButton.disabled = false;
  }, 2400);
});

setInterval(() => {
  if (filter) {
    filter.frequency.value = freqSlider.value;
  }
}, 30);

const play = (delay, pitch, duration) => {
  const osc = createOsc(pitch);
  const startTime = audioCtx.currentTime + delay;
  const endTime = startTime + duration;
  vca = createVCA(startTime, endTime);
  filter = createFilter();

  osc.connect(vca);
  vca.connect(filter);
  filter.connect(audioCtx.destination);
  osc.start(startTime);
  osc.stop(endTime);
}

const createOsc = (pitch) => {
  const tmpOsc = audioCtx.createOscillator();
  tmpOsc.type = 'sine';
  tmpOsc.frequency.value = pitch;
  return tmpOsc;
};

const createFilter = () => {
  if (!filter) {
    filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
  }
  return filter;
};

const createVCA = (startTime, endTime) => {
  if (!vca) {
    vca = audioCtx.createGain();
  }
  vca.gain.exponentialRampToValueAtTime(1, startTime);
  vca.gain.exponentialRampToValueAtTime(0.0001, endTime - 0.01);
  return vca;

}