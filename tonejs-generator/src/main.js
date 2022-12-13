import { GeneratorClass } from "./generator";

const generator = new GeneratorClass();

console.log("***generator", generator);

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
