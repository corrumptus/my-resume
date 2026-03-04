import htmlPreProcessor from "./html-preprocessor";

function escapeTagBrackets(s: string) {
    return s
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}

function highlightRestDoctype(str: string) {
    return str
        .split(" ")
        .map(arg => arg.startsWith('"') ? highlightAttrValue(arg) : highlightAttrName(arg))
        .join(" ");
}

function highlightDoctype(str: string) {
    return highlightTagBracket(str.slice(0, 2))
        +
        highlightTagName(str.slice(2, 9))
        +
        " "
        +
        highlightRestDoctype(str.slice(10, -1))
        +
        highlightTagBracket(str.slice(-1));
}

function highlightTagBracket(str: string) {
    return `<span style="color: var(--tagBracket);">${escapeTagBrackets(str)}</span>`;
}

function highlightTagName(str: string) {
    return `<span style="color: var(--tagName);">${str}</span>`;
}

function highlightAttrName(str: string) {
    return `<span style="color: var(--attrName);">${str}</span>`;
}

function highlightAttrAssign(str: string) {
    return `<span style="color: var(--attrAssign);">${str}</span>`;
}

function highlightAttrValue(str: string) {
    return `<span style="color: var(--attrValue);">${str}</span>`;
}

function highlightText(str: string) {
    return `<span style="color: var(--text);">${str}</span>`;
}

function highlightComment(str: string) {
    return `<span style="color: var(--comment);">${str}</span>`;
}

export default function htmlHighlighter(html: string) {
    let highlightedHtml = "";

    const processed = htmlPreProcessor(html);

    let start = 0;

    processed.forEach(info => {
        highlightedHtml += html.slice(start, info.start);

        highlightedHtml += {
            "doctype": highlightDoctype(html.slice(info.start, info.end)),
            "tagBeginBracket": highlightTagBracket(html.slice(info.start, info.end)),
            "tagEndBracket": highlightTagBracket(html.slice(info.start, info.end)),
            "tagName": highlightTagName(html.slice(info.start, info.end)),
            "attrName": highlightAttrName(html.slice(info.start, info.end)),
            "attrAssign": highlightAttrAssign(html.slice(info.start, info.end)),
            "attrValue": highlightAttrValue(html.slice(info.start, info.end)),
            "text": highlightText(html.slice(info.start, info.end)),
            "comment": highlightComment(html.slice(info.start, info.end)),
        }[info.type] || "";

        start = info.end;
    });

    highlightedHtml += html.slice(start);

    return highlightedHtml;
}