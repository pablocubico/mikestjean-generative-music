import { Instrument } from "../instrument";
import { PolySynth } from "tone";
import { generatePartNotes } from "../helpers";

export class Pad extends Instrument {
  constructor() {
    super("Pad", new PolySynth());

    this.toneJsInstrument.set({
      envelope: {
        attack: 2,
        decay: 0.5,
        sustain: 0.5,
        release: 0.5,
      },
    });
    this.toneJsInstrument.volume.value = -10;
  }

  playNote = (time, note, velocity, duration) => {
    this.toneJsInstrument.triggerAttackRelease(
      ["C3", "Eb3", "G3"],
      duration + "n",
      time,
      0.25
    );
  };

  generate() {
    const { partNotes, notesWithRests } = generatePartNotes({
      rhythmicCells: ["1", "2", "2r", "1r"],
    });
    this.instrumentPart = this.createPart(partNotes);
    this.currentPattern = notesWithRests;

    return {
      partNotes,
      notesWithRests,
    };
  }
}
