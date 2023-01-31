const playButton = document.getElementById("play");
let audioCtx;

playButton.addEventListener("click", () => {
  // The AudioContext must be resumed (or created)
  // after a user gesture on the page
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  play(0, 523.25, 0.3);
  play(0.3, 587.33, 0.3);
  play(0.6, 659.25, 0.3);
  play(0.9, 698.46, 0.3);
  play(1.2, 783.99, 0.3);
  playButton.disabled = true;
  setTimeout(() => {
    playButton.disabled = false;
  }, 1500);
});

const play = (delay, pitch, duration) => {
  const osc = createOsc(pitch);
  const startTime = audioCtx.currentTime + delay;
  const endTime = startTime + duration;
  osc.start(startTime, duration);
  osc.stop(endTime);
}

const createOsc = (pitch) => {
  const tmpOsc = audioCtx.createOscillator();
  tmpOsc.type = 'sine';
  tmpOsc.frequency.value = pitch;
  tmpOsc.connect(audioCtx.destination);
  return tmpOsc;
};