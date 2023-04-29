import { Chuck } from "webchuck";
import { audioContext, gainNode } from "./audioContext";
import { createChuckEditor } from "./editor";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

let theChuck: Chuck;
var chuckEditor: monaco.editor.IStandaloneCodeEditor;

export async function startChuck(button: HTMLButtonElement) {
    const ChucK = (await import("webchuck")).Chuck;
    //theChuck = await ChucK.init([], audioContext);
    const webchuckWasm = await fetch("webchuck.wasm")
        .then((response) => response.arrayBuffer())
        .then((bytes) => new Uint8Array(bytes));

    await audioContext.audioWorklet.addModule("https://chuck.stanford.edu/webchuck/src/webchuck.js");
    theChuck = new ChucK([], audioContext, webchuckWasm);
    theChuck.connect(gainNode);

    button.innerText = "WebFaucK is Ready!";
    button.disabled = true;
}

export function playChuck() {
    theChuck!.runCode(chuckEditor?.getValue()!);
}

export function stopChuck() {
    theChuck!.removeLastCode();
}

// after dom is loaded, create the editor
document.addEventListener("DOMContentLoaded", () => {
    chuckEditor = createChuckEditor(
        document.getElementById("editor1") as HTMLDivElement
    );
});
