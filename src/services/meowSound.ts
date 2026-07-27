// Web Audio API Synthesizer for 1-second playful cat melody

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays a cute, cheerful 1-second cat melody on site click
 */
export function playMeowSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const maxDuration = 0.95; // Strictly capped under 1 second

    // Main master gain for safety & comfortable volume
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.28, now);
    masterGain.gain.setValueAtTime(0.28, now + maxDuration - 0.1);
    masterGain.gain.linearRampToValueAtTime(0.001, now + maxDuration);
    masterGain.connect(ctx.destination);

    // Cute playful 4-note ascending melody (C5, E5, G5, C6 meow-bend)
    const melodyNotes = [
      { freq: 523.25, start: 0.0, duration: 0.22 },   // C5
      { freq: 659.25, start: 0.20, duration: 0.22 },  // E5
      { freq: 783.99, start: 0.40, duration: 0.25 },  // G5
      { freq: 1046.50, start: 0.62, duration: 0.32 }, // C6 with meow tail
    ];

    melodyNotes.forEach((note, index) => {
      const noteStartTime = now + note.start;
      const noteStopTime = Math.min(now + maxDuration, noteStartTime + note.duration);

      // Dual Oscillator for rich musical chime timbre
      const osc = ctx.createOscillator();
      const subOsc = ctx.createOscillator();

      osc.type = index === 3 ? 'sawtooth' : 'sine'; // Meow expression on last note
      subOsc.type = 'triangle';

      if (index === 3) {
        // Cute pitch bend on final note ("meow-up-and-down")
        osc.frequency.setValueAtTime(note.freq * 0.9, noteStartTime);
        osc.frequency.exponentialRampToValueAtTime(note.freq * 1.15, noteStartTime + 0.12);
        osc.frequency.exponentialRampToValueAtTime(note.freq * 0.85, noteStopTime);

        subOsc.frequency.setValueAtTime(note.freq * 0.9, noteStartTime);
        subOsc.frequency.exponentialRampToValueAtTime(note.freq * 1.15, noteStartTime + 0.12);
        subOsc.frequency.exponentialRampToValueAtTime(note.freq * 0.85, noteStopTime);
      } else {
        osc.frequency.setValueAtTime(note.freq, noteStartTime);
        subOsc.frequency.setValueAtTime(note.freq * 0.5, noteStartTime);
      }

      // Filter for warm vocal tone
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(index === 3 ? 1800 : 2400, noteStartTime);

      // Note Gain Envelope
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, noteStartTime);
      gain.gain.linearRampToValueAtTime(0.2, noteStartTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, noteStopTime);

      osc.connect(filter);
      subOsc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);

      osc.start(noteStartTime);
      subOsc.start(noteStartTime);
      osc.stop(noteStopTime);
      subOsc.stop(noteStopTime);
    });

  } catch (err) {
    console.warn('AudioContext playback error:', err);
  }
}
