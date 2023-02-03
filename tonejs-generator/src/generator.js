import { Transport, Gain, Reverb, Delay } from "tone";

import { Kick } from "./instruments/kick";
import { Pad } from "./instruments/pad";
import { Plucked } from "./instruments/plucked";
import { Bass } from "./instruments/bass";
export class GeneratorClass {
  masterOutput = null;
  masterReverb = null;
  masterDelay = null;
  instruments = [];
  currentPart = null;
  randomNotes = [];
  onRandomNotesChange = () => {};

  constructor() {
    this.masterOutput = new Gain(0.5).toDestination();
    this.masterReverb = new Reverb();
    this.masterDelay = new Delay("8n.");

    this.masterReverb.set({
      wet: 0.15,
      decay: 10,
    });

    this.masterReverb.connect(this.masterOutput);
    this.masterDelay.connect(this.masterReverb);

    const kick = new Kick();
    this.addInstrument(kick);

    const pad = new Pad();
    this.addInstrument(pad);

    const plucked = new Plucked();
    this.addInstrument(plucked);

    const bass = new Bass();
    this.addInstrument(bass);
  }

  stop = () => {
    this.instruments.forEach((instrument) => {
      instrument.stop();
    });
  };

  start = () => {
    this.stop();

    this.instruments.forEach((instrument) => {
      instrument.generate();
      instrument.start();
    });

    this.render();

    Transport.start();
  };

  render = () => {
    const instrumentsVisualizer = document.getElementById(
      "instrumentsVisualizer"
    );
    instrumentsVisualizer.innerHTML = "";

    this.instruments.forEach((instrument) => {
      const labelDiv = document.createElement("DIV");
      labelDiv.classList.add("debugPatternLabel");

      labelDiv.innerHTML = instrument.name;
      instrumentsVisualizer.appendChild(labelDiv);

      const debugPatternDiv = document.createElement("DIV");
      debugPatternDiv.classList.add("debugPattern");

      const partNotes = instrument.currentPattern;
      partNotes.forEach((note) => {
        const duration = parseInt(note.duration.replace("r", ""));
        debugPatternDiv.innerHTML += `<div class="debugPatternNote" style="width: calc(100%/${duration})">${note.duration}</div>`;
      });

      instrumentsVisualizer.appendChild(debugPatternDiv);
    });
  };

  addInstrument = (instrument) => {
    this.instruments.push(instrument);
    instrument.connectTo(this.masterDelay);
  };
}
