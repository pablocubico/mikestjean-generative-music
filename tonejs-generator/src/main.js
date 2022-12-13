import { GeneratorClass } from "./generator";
import { start as ToneStart, Transport } from "tone";

const generator = new GeneratorClass();

const btn = document.querySelector("#generate");
btn.addEventListener("click", async () => {
  await ToneStart();
  Transport.bpm.value = 100;

  const debugPatternDiv = document.querySelector(".debugPattern");

  generator.onRandomNotesChange = (randomNotes) => {
    debugPatternDiv.innerHTML = "";
    randomNotes.forEach((note) => {
      const duration = parseInt(note.duration.replace("r", ""));
      debugPatternDiv.innerHTML += `<div class="debugPatternNote" style="width: calc(100%/${duration})">${note.duration}</div>`;
    });
  };

  generator.start();

  Transport.start();
});

const stopButton = document.querySelector("#stop");
stopButton.addEventListener("click", () => {
  generator.stop();
});
