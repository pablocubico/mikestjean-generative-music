import { generatePartNotes } from "./helpers";
import { TIME_SIGNATURE } from "./constants";
import { Part, Time } from "tone";

export class Instrument {
  name = "";
  toneJsInstrument = null;
  currentPattern = null;

  constructor(name, toneJsInstrument) {
    this.name = name;
    this.toneJsInstrument = toneJsInstrument;
  }

  createPart(partNotes) {
    const timeSignatureUnit = TIME_SIGNATURE.split("/")[1];

    const generatedPart = new Part((time, value) => {
      this.playNote(time, value.note, value.velocity, value.duration);
    }, partNotes);

    generatedPart.loopEnd = Time(`${timeSignatureUnit}n`).toSeconds() * 4;
    generatedPart.loop = true;

    return generatedPart;
  }

  generate() {
    const { partNotes, notesWithRests } = generatePartNotes();
    this.instrumentPart = this.createPart(partNotes);
    this.currentPattern = notesWithRests;

    return {
      partNotes,
      notesWithRests,
    };
  }

  start() {
    this.instrumentPart && this.instrumentPart.start();
  }

  stop() {
    this.instrumentPart && this.instrumentPart.stop();
  }

  connectTo(destination) {
    this.toneJsInstrument.connect(destination);
  }
}
