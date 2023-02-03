import { Instrument } from "../instrument";
import { MembraneSynth } from "tone";
import { generatePartNotes } from "../helpers";

export class Kick extends Instrument {
  constructor() {
    super("Kick", new MembraneSynth());
  }

  playNote = (time, note, velocity, duration) => {
    this.toneJsInstrument.triggerAttackRelease(
      "C2",
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
