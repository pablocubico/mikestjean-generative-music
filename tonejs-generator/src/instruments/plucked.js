import { Instrument } from "../instrument";
import { PluckSynth, PingPongDelay } from "tone";
import { generatePartNotes } from "../helpers";

export class Plucked extends Instrument {
  pingPongDelay = null;

  constructor() {
    const genPluck = new PluckSynth();
    genPluck.resonance = 0.7;
    genPluck.dampening = 4000;
    super("Plucked", genPluck);
    this.pingPongDelay = new PingPongDelay("8n", 0.2).toDestination();
    this.toneJsInstrument.volume.value = -7;
  }

  playNote = (time, note, velocity, duration) => {
    const possibleNotes = ["C5", "D5", "Eb5", "F5", "G5", "A5", "Bb5"];
    const randomNote =
      possibleNotes[Math.floor(Math.random() * possibleNotes.length)];

    this.toneJsInstrument.triggerAttackRelease(
      randomNote,
      duration + "32n",
      time,
      velocity
    );
  };

  connectTo(destination) {
    this.toneJsInstrument.connect(this.pingPongDelay);
    this.pingPongDelay.connect(destination);
  }
}
