import { GeneratorClass } from "./generator";
import { start as ToneStart, Transport } from "tone";

const generator = new GeneratorClass();

const btn = document.querySelector("#generate");
btn.addEventListener("click", async () => {
  console.log("*** 'Generate' Clicked");
  await ToneStart();
  Transport.bpm.value = 60;

  generator.start();
});

const stopButton = document.querySelector("#stop");
stopButton.addEventListener("click", () => {
  generator.stop();
});
