import type { Theme } from "../main";
import htmlPreProcessor from "./html-preprocessor";

function escapeTagBrackets(s: string) {
    return s
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}

function highlightRestDoctype(str: string, theme: Theme) {
    return str
        .split(" ")
        .map(arg => arg.startsWith('"') ? highlightAttrValue(arg, theme) : highlightAttrName(arg, theme))
        .join(" ");
}

function highlightDoctype(str: string, theme: Theme) {
    return highlightTagBracket(str.slice(0, 2), theme)
        +
        highlightTagName(str.slice(2, 9), theme)
        +
        " "
        +
        highlightRestDoctype(str.slice(10, -1), theme)
        +
        highlightTagBracket(str.slice(-1), theme);
}

function highlightTagBracket(str: string, theme: Theme) {
    return `<span style="color: ${theme.tagBracket}">${escapeTagBrackets(str)}</span>`;
}

function highlightTagName(str: string, theme: Theme) {
    return `<span style="color: ${theme.tagName}">${str}</span>`;
}

function highlightAttrName(str: string, theme: Theme) {
    return `<span style="color: ${theme.attrName}">${str}</span>`;
}

function highlightAttrAssign(str: string, theme: Theme) {
    return `<span style="color: ${theme.attrAssign}">${str}</span>`;
}

function highlightAttrValue(str: string, theme: Theme) {
    return `<span style="color: ${theme.attrValue}">${str}</span>`;
}

function highlightText(str: string, theme: Theme) {
    return `<span style="color: ${theme.text}">${str}</span>`;
}

function highlightComment(str: string, theme: Theme) {
    return `<span style="color: ${theme.comment}">${str}</span>`;
}

export default function htmlHighlighter(html: string, theme: Theme) {
    let highlightedHtml = "";

    const processed = htmlPreProcessor(html);

    let start = 0;

    processed.forEach(info => {
        highlightedHtml += html.slice(start, info.start);

        highlightedHtml += {
            "doctype": highlightDoctype(html.slice(info.start, info.end), theme),
            "tagBeginBracket": highlightTagBracket(html.slice(info.start, info.end), theme),
            "tagEndBracket": highlightTagBracket(html.slice(info.start, info.end), theme),
            "tagName": highlightTagName(html.slice(info.start, info.end), theme),
            "attrName": highlightAttrName(html.slice(info.start, info.end), theme),
            "attrAssign": highlightAttrAssign(html.slice(info.start, info.end), theme),
            "attrValue": highlightAttrValue(html.slice(info.start, info.end), theme),
            "text": highlightText(html.slice(info.start, info.end), theme),
            "comment": highlightComment(html.slice(info.start, info.end), theme),
        }[info.type] || "";

        start = info.end;
    });

    highlightedHtml += html.slice(start);

    return highlightedHtml;
}