import { Instrument } from "../instrument";
import { FMSynth } from "tone";
import { generatePartNotes } from "../helpers";

export class Bass extends Instrument {
  constructor() {
    super("Bass", new FMSynth());

    this.toneJsInstrument.set({
      harmonicity: 1,
      modulationIndex: 0.5,
      attack: 0,
      release: 0,
    });
  }

  playNote = (time, note, velocity, duration) => {
    const possibleNotes = ["C2", "Eb2", "G2", "C3"];
    const randomNote =
      possibleNotes[Math.floor(Math.random() * possibleNotes.length)];

    this.toneJsInstrument.triggerAttackRelease(
      randomNote,
      duration + "n",
      time,
      velocity
    );
  };

  generate() {
    const { partNotes, notesWithRests } = generatePartNotes({
      rhythmicCells: ["2", "4", "8 8"],
    });
    this.instrumentPart = this.createPart(partNotes);
    this.currentPattern = notesWithRests;

    return {
      partNotes,
      notesWithRests,
    };
  }
}
