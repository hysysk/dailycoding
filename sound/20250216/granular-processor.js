class GranularProcessor extends AudioWorkletProcessor {

  static get parameterDescriptors() {
    return [
      {
        name: 'grainSize',
        defaultValue: 0.1, // in seconds
        minValue: 0.01,
        maxValue: 1.0,
      },
      {
        name: 'playbackRate',
        defaultValue: 1.0,
        minValue: 0.5,
        maxValue: 2.0,
      }
    ];
  }

  constructor() {
    super();

    // A small buffer to capture incoming audio and create grains from.
    // For example, keep 2 seconds of audio (depends on your needs).
    this.ringBufferSize = 2 * sampleRate;
    this.ringBufferLeft = new Float32Array(this.ringBufferSize);
    this.ringBufferRight = new Float32Array(this.ringBufferSize);
    this.writeIndex = 0;

    // For each grain, we’ll keep track of a random read position, etc.
    // This is a naive approach: we pick a random position each time.
    this.grainIndex = 0;
    this.currentGrainSizeInSamples = 0;
    this.envelopeIndex = 0;

    // We’ll get messages from the main thread if needed:
    this.port.onmessage = (event) => {
      // e.g. dynamic changes, not strictly needed in minimal example
    };
  }

  process(inputs, outputs, parameters) {
    const outputLeft = outputs[0][0];
    const outputRight = outputs[0][1];

    // In case there’s no stereo, adjust accordingly.
    const inputLeft = inputs[0][0];
    const inputRight = (inputs[0].length > 1) ? inputs[0][1] : null;

    if (!inputLeft || !outputLeft || !outputRight) {
      // Nothing to do
      return true;
    }

    // 1. Write incoming audio to the ring buffer
    for (let i = 0; i < inputLeft.length; i++) {
      this.ringBufferLeft[this.writeIndex] = inputLeft[i];
      if (inputRight) {
        this.ringBufferRight[this.writeIndex] = inputRight[i];
      } else {
        this.ringBufferRight[this.writeIndex] = inputLeft[i];
      }
      this.writeIndex = (this.writeIndex + 1) % this.ringBufferSize;
    }

    // 2. Generate grains
    //    For each frame, we output a sample from a randomly chosen location
    //    that changes every “grainSize” seconds.

    const grainSizeParam = parameters.grainSize;
    const playbackRateParam = parameters.playbackRate;

    // We’ll assume the param arrays are either length 1 or 128, 
    // so we do per-sample logic below.

    for (let i = 0; i < outputLeft.length; i++) {
      // Evaluate current parameter values (if they are in an automation array)
      const currentGrainSize = grainSizeParam.length > 1
        ? grainSizeParam[i]
        : grainSizeParam[0];
      const currentPlaybackRate = playbackRateParam.length > 1
        ? playbackRateParam[i]
        : playbackRateParam[0];

      const grainSizeInSamples = Math.floor(currentGrainSize * sampleRate);

      // If we have completed a grain, pick a new random start in ring buffer.
      if (this.currentGrainSizeInSamples <= 0) {
        // pick random start
        this.grainIndex = Math.floor(Math.random() * this.ringBufferSize);
        this.currentGrainSizeInSamples = grainSizeInSamples;
        this.envelopeIndex = 0;
      }

      // Read the ring buffer at (grainIndex), factoring in playback rate
      const samplePos = Math.floor(this.grainIndex);
      const leftSample = this.ringBufferLeft[samplePos];
      const rightSample = this.ringBufferRight[samplePos];

      // Simple (very naive) amplitude envelope: linear ramp in/out
      // We can do a short fade in/out to avoid clicks, for example:
      const fadeInEnd = 0.2 * grainSizeInSamples;      // first 20% fade in
      const fadeOutStart = 0.8 * grainSizeInSamples;   // last 20% fade out
      let amplitude = 1.0;

      if (this.envelopeIndex < fadeInEnd) {
        amplitude = this.envelopeIndex / fadeInEnd;
      } else if (this.envelopeIndex > fadeOutStart) {
        amplitude = 1.0 - (this.envelopeIndex - fadeOutStart) / (grainSizeInSamples - fadeOutStart);
      }

      // Write to output
      outputLeft[i] = leftSample * amplitude;
      outputRight[i] = rightSample * amplitude;

      // Update grain counters
      this.grainIndex += currentPlaybackRate;
      if (this.grainIndex >= this.ringBufferSize) {
        this.grainIndex = 0;
      }

      this.currentGrainSizeInSamples--;
      this.envelopeIndex++;
    }

    return true;
  }
}

registerProcessor('granular-processor', GranularProcessor);
