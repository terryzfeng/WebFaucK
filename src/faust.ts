import { Faust, FaustAudioWorkletNode, FaustScriptProcessorNode } from "faust2webaudio";
import { audioContext, gainNode } from "./audioContext";
import { createFaustEditor } from "./editor";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

let faustEditor : monaco.editor.IStandaloneCodeEditor;
let monoNode : FaustAudioWorkletNode | FaustScriptProcessorNode;

// Set up Faust compiler
const faust = new Faust({
    // Update the below paths with the locations of the necessary files!
    // They can be found inside the Node module, under the 'dist' directory.
    wasmLocation: "libfaust-wasm.wasm",
    dataLocation: "libfaust-wasm.data",
});

export async function startFaust() {
    // Define Faust programs to run
    const monoCode = faustEditor?.getValue();

    audioContext.resume();

    // Ensure that the compiler is ready before continuing
    await faust.ready;

    // Compile monophonic code and connect the generated Web Audio node to the output.
    monoNode = await faust.getNode(monoCode, {
        audioCtx: audioContext,
        useWorklet: window.AudioWorklet ? true : false,
        args: { "-I": "libraries/" },
    });

    // @ts-ignore
    gainNode.connect(monoNode);

    // @ts-ignore
    monoNode.connect(audioContext.destination);
}


export function stopFaust() {
    // @ts-ignore
    gainNode.disconnect(monoNode);
    // @ts-ignore
    monoNode.disconnect(audioContext.destination);
}


// after dom is loaded, create the editor
document.addEventListener("DOMContentLoaded", () => {
    faustEditor = createFaustEditor(document.getElementById("editor2") as HTMLDivElement);
});

