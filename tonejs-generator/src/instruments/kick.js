import { Instrument } from "../instrument";
import { MembraneSynth } from "tone";
import { Filter } from "tone";
import { generatePartNotes } from "../helpers";

export class Kick extends Instrument {
  constructor() {
    const kickMembrane = new MembraneSynth({
      pitchDecay: 0.05,
      octaves: 10,
      oscillator: {
        type: "sine"
      },
      envelope: {
        attack: 0.001,
        decay: 0.2,
        sustain: 0.2,
        release: 0.2
      });

    const kickFilter = new Filter(400, "lowpass");
    kickMembrane.connect(kickFilter);
    
    super("Kick", kickMembrane);
  }

  playNote = (time, note, velocity, duration) => {
    this.toneJsInstrument.triggerAttackRelease(
      "C1",
      duration + "n",
      time,
      velocity
    );
  };

  generate() {
    const { partNotes, notesWithRests } = generatePartNotes({
      rhythmicCells: ["2", "4", "2r", "4r"],
    });
    this.instrumentPart = this.createPart(partNotes);
    this.currentPattern = notesWithRests;

    return {
      partNotes,
      notesWithRests,
    };
  }
}
