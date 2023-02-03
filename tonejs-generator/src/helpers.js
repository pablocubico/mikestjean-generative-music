import { Time, Part } from "tone";
import { DEFAULT_RHYTHMIC_CELLS, TIME_SIGNATURE } from "./constants";

export function getSuitablePatterns(patterns, maxDuration) {
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
export function getRandomNotes(
  timeSignature,
  defaultNote = "C4",
  rhythmicCells = DEFAULT_RHYTHMIC_CELLS
) {
  const noteAmount = parseInt(timeSignature.split("/")[0], 10);
  const noteType = parseInt(timeSignature.split("/")[1], 10);
  const notes = [];
  let remainingDuration = noteAmount / noteType;

  while (remainingDuration > 0) {
    const pattern = getSuitablePatterns(rhythmicCells, remainingDuration);
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
export function notesToTonePart(notes) {
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
    startTime += Time(
      parseInt(note.duration.replace("r", "")) + "n"
    ).toSeconds();
  });

  return partNotes;
}

export function generatePartNotes(options) {
  const rhythmicCells = options?.rhythmicCells || DEFAULT_RHYTHMIC_CELLS;

  const notesWithRests = getRandomNotes(TIME_SIGNATURE, "C4", rhythmicCells);
  const partNotes = notesToTonePart(notesWithRests);

  return { partNotes, notesWithRests };
}
