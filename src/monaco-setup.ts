import * as monaco from "monaco-editor";

import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "html" || label === "handlebars" || label === "razor")
      return new htmlWorker();

    if (label === "css" || label === "scss" || label === "less")
      return new cssWorker();

    if (label === "json")
      return new jsonWorker();

    if (label === "typescript" || label === "javascript")
      return new tsWorker();

    return new editorWorker();
  }
};

(async () => {
  const htmlEntry = monaco.languages.getLanguages().find(l => l.id === 'html');

  // @ts-ignore
  if (!htmlEntry?.loader) throw new Error('HTML loader não encontrado');

  // @ts-ignore
  const mod = await htmlEntry.loader();
  const htmlLang = mod.language;

  await new Promise(res => setTimeout(res, 100));

  htmlLang.tokenizer.doctype[1] = [ />/, "delimiter", "@pop" ];
  htmlLang.tokenizer.doctype.unshift(
    [ /doctype/, "metatag" ]
  );

  htmlLang.tokenizer.root[0] = [ /(<!)(?=doctype\b)/i, "delimiter", "@doctype" ];

  monaco.languages.setMonarchTokensProvider('html', htmlLang);
})();