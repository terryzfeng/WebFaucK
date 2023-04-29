import * as monaco from "monaco-editor";
import { editorConfig } from "./chuckEditor/chuck-lang";
import { defaultChuck, defaultFaust } from "./code";

/*--------------------------  Monaco Worker --------------------------*/
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

self.MonacoEnvironment = {
    getWorker(_: any, label: string) {
        if (label === "json") {
            return new jsonWorker();
        }
        if (label === "css" || label === "scss" || label === "less") {
            return new cssWorker();
        }
        if (label === "html" || label === "handlebars" || label === "razor") {
            return new htmlWorker();
        }
        if (label === "typescript" || label === "javascript") {
            return new tsWorker();
        }
        return new editorWorker();
    },
};

/*----------------------- EDITOR --------------------------*/

export function createChuckEditor(editorDiv: HTMLDivElement) {
    let editor = monaco.editor.create(editorDiv, {
        // Params
        theme: "vs-light",
        language: "chuck",
        minimap: {
            enabled: false,
        },

        model: editorConfig,
    });
    editor.setValue(defaultChuck);

    return editor;
}

export function createFaustEditor(editorDiv: HTMLDivElement) {
    let editor = monaco.editor.create(editorDiv, {
        // Params
        theme: "vs-light",
        language: "java",
        minimap: {
            enabled: false,
        },
        value: defaultFaust,
    });

    return editor;
}