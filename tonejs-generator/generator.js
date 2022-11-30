import "https://unpkg.com/tone@14.7.77/build/Tone.js";

const btn = document.querySelector(".play");
btn.addEventListener("click", async () => {
  await Tone.start();
  Tone.Transport.bpm.value = 100;

  const synth = new Tone.Synth().toDestination();
  const part = new Tone.Part(
    function (time, value) {
      synth.triggerAttackRelease(
        value.note,
        value.duration,
        time,
        value.velocity
      );
    },
    [
      { time: "0:0", note: "B4", velocity: 0.9, duration: "4t" },
      { time: "0:0.66666", note: "D5", velocity: 0.5, duration: "4t" },
      { time: "0:1.33333", note: "A5", velocity: 0.5, duration: "4t" },
      { time: "0:2", note: "B5", velocity: 0.9, duration: "1n" },
      { time: "0:5", note: "E6", velocity: 0.9, duration: "8n" },
      { time: "0:5.5", note: "D6", velocity: 0.9, duration: "8n" },
      { time: "0:6", note: "B5", velocity: 0.9, duration: "8n" },
      { time: "0:6.5", note: "G5", velocity: 0.9, duration: "8n" },
      { time: "0:7", note: "B5", velocity: 0.9, duration: "4n." },
      { time: "0:8.5", note: "D6", velocity: 0.9, duration: "8n" },
      { time: "0:9", note: "A5", velocity: 0.9, duration: "2n" },
    ]
  );

  Tone.Transport.start();
  part.start(Tone.now());
});
