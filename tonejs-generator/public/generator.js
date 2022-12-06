import "https://unpkg.com/tone@14.7.77/build/Tone.js";

const TIME_SIGNATURE = "4/4";

// 16 = sixteenth note,
// 16r = sixteenth rest
const RHYTHMIC_CELLS = [
  "1",
  "1r",
  "2",
  "2r",
  "4",
  "4r",
  "8 8",
  "8 8r",
  "8r 8",
  "16 16 16 16",
  "16 16 8",
  "16 8 16",
  "8 16 16",
  "16r 16 16 16",
  "16 16r 16 16",
  "16 16 16r 16",
  "16 16 16 16r",
];

function getSuitablePatterns(patterns, maxDuration) {
  const suitablePatterns = patterns.filter(function (pattern) {
    let duration = 0;
    pattern.split().forEach(function (note) {
      duration = duration + 1 / parseInt(note.replace("r", ""));
    });
    return duration <= maxDuration;
  });
  return suitablePatterns[Math.floor(Math.random() * suitablePatterns.length)];
}

/**
 * Get random notes for 1 bar
 */
function getRandomNotes(timeSignature, defaultNote = "C4") {
  const noteAmount = parseInt(timeSignature.split("/")[0], 10);
  const noteType = parseInt(timeSignature.split("/")[1], 10);
  const notes = [];
  let remainingDuration = noteAmount / noteType;

  while (remainingDuration > 0) {
    const pattern = getSuitablePatterns(RHYTHMIC_CELLS, remainingDuration);
    pattern.split(" ").forEach(function (note) {
      notes.push({ notes: [defaultNote], duration: note });
      remainingDuration =
        remainingDuration - 1 / parseInt(note.replace("r", ""));
    });
  }
  return notes;
}

/**
 * Convert notes to Tone.js notation
 */
function notesToTonePart(notes) {
  let startTime = 0;
  const partNotes = [];

  notes.forEach((note, noteIndex) => {
    if (note.duration.indexOf("r") == -1) {
      partNotes.push({
        time: startTime,
        note: "C2",
        velocity: 0.5,
        duration: note.duration,
        data: {
          index: noteIndex,
        },
      });
    }
    startTime += Tone.Time(
      parseInt(note.duration.replace("r", "")) + "n"
    ).toSeconds();
  });

  return partNotes;
}

export class GeneratorClass {
  outputs = [];
  currentPart = null;
  randomNotes = [];
  synth = null;
  onRandomNotesChange = () => {};

  constructor() {
    this.synth = new Tone.MembraneSynth().toDestination();
  }

  stop = () => {
    if (this.currentPart) {
      this.currentPart.stop();
      this.currentPart.cancel();
      this.currentPart.dispose();
    }
  };

  playNote = (time, note, velocity, duration) => {
    this.synth.triggerAttackRelease("C2", duration + "n", time, velocity);
  };

  start = () => {
    this.stop();

    const timeSignatureUnit = TIME_SIGNATURE.split("/")[1];

    const tempRandomNotes = getRandomNotes(TIME_SIGNATURE);
    const partNotes = notesToTonePart(tempRandomNotes);

    this.onRandomNotesChange(tempRandomNotes);

    this.currentPart = new Tone.Part((time, value) => {
      this.playNote(time, value.note, value.velocity, value.duration);
    }, partNotes);

    this.currentPart.loopEnd =
      Tone.Time(`${timeSignatureUnit}n`).toSeconds() * 4;
    this.currentPart.loop = true;

    this.currentPart.start("+0");
  };
}

const generator = new GeneratorClass();

const btn = document.querySelector("#generate");
btn.addEventListener("click", async () => {
  await Tone.start();
  Tone.Transport.bpm.value = 100;

  const debugPatternDiv = document.querySelector(".debugPattern");

  generator.onRandomNotesChange = (randomNotes) => {
    debugPatternDiv.innerHTML = "";
    randomNotes.forEach((note) => {
      const duration = parseInt(note.duration.replace("r", ""));
      debugPatternDiv.innerHTML += `<div class="debugPatternNote" style="width: calc(100%/${duration})">${note.duration}</div>`;
    });
  };

  generator.start();

  Tone.Transport.start();
});

const stopButton = document.querySelector("#stop");
stopButton.addEventListener("click", () => {
  generator.stop();
});
