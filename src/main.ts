import "./style.css";
import { playChuck, startChuck, stopChuck } from "./webchuck";
import { startFaust, stopFaust } from "./faust";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>WebFaucK O.o</h1>
    <p>ChucK => Faust, courtesy of the Web Audio API</p>
    <button id="start" type="button">Start WebFaucK</button>
    <div class="main">
      <div class="editorWrapper">
        <h2>ChucK</h2>
        <div id="editor1" class="editor"></div>   
      </div>
      <div class="editorWrapper">
        <h2>Faust</h2>
        <div id="editor2" class="editor"></div>   
      </div>
    </div>
    <div class="card">
      <button id="compile" type="button" disabled>Compile + Play</button>
      <button id="stop" type="button" disabled>Stop</button>
    </div>
  </div>
`;

// Arm the buttons
document.getElementById("start")!.addEventListener("click", async () => {
  await startChuck(document.getElementById("start") as HTMLButtonElement);
  // @ts-ignore
  document.getElementById("compile")!.disabled = false;
  // @ts-ignore
  document.getElementById("stop")!.disabled = false;

});

document.getElementById("compile")!.addEventListener("click", () => {
  playChuck();
  startFaust();
});

document.getElementById("stop")!.addEventListener("click", () => {
  stopChuck();
  stopFaust();
});
