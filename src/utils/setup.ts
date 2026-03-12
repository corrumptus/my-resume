import { monaco } from "react-monaco-editor";
import themes from "./themes";

Object.entries(themes).map(([ theme, properties ]) => {
    monaco.editor.defineTheme(theme, {
        base: theme === "light" ? "vs" : "vs-dark",
        inherit: true,
        rules: [
            { token: "", foreground: properties.text },

            { token: "metatag.html", foreground: properties.tagName },
            { token: "metatag.content.html", foreground: properties.attrName },

            { token: "tag", foreground: properties.tagName },
            { token: "delimiter.html", foreground: properties.tagBracket },

            { token: "attribute.name", foreground: properties.attrName },
            { token: "attribute.value", foreground: properties.attrValue },

            { token: "string.html", foreground: properties.text },

            { token: "comment", foreground: properties.comment }
        ],
        colors: {
            "editor.background": properties.secondaryBgColor,
        }
    });
});