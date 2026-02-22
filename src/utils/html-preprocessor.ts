import { parse, type DefaultTreeAdapterTypes } from "parse5";

/**
 * Retorna tokens com offsets para você colorir o texto original.
 * Tokens: doctype, tag brackets, tagName, attrName, attrValue, endTag, text, comment.
 */
export default function htmlPreProcessor(html: string) {
    const doc = parse(html, { sourceCodeLocationInfo: true });

    const tokens: { type: string, start: number, end: number }[] = [];

    function push(type: string, start: number, end: number) {
        if (typeof start !== "number" || typeof end !== "number") return;
        if (start < 0 || end < start) return;
        tokens.push({ type, start, end });
    }

    function walk(node: DefaultTreeAdapterTypes.Element) {
        if (!node) return;

        // DOCTYPE (no default tree adapter: nodeName === "#documentType")
        if (node.nodeName === "#documentType") {
            const loc = node.sourceCodeLocation;
            if (loc) push("doctype", loc.startOffset, loc.endOffset);
            return;
        }

        // Comment
        if (node.nodeName === "#comment") {
            const loc = node.sourceCodeLocation;
            if (loc) push("comment", loc.startOffset, loc.endOffset);
            return;
        }

        // Text
        if (node.nodeName === "#text") {
            const loc = node.sourceCodeLocation;
            if (!loc) return;
            if (
                (node as unknown as DefaultTreeAdapterTypes.TextNode).value.length
                <
                loc.endOffset - loc.startOffset
            ) {
                push("text", loc.startOffset, loc.startOffset + 1);
                push("text", loc.endOffset - 1, loc.endOffset);
            } else
                push("text", loc.startOffset, loc.endOffset);
        }

        // Element
        if (node.tagName && node.sourceCodeLocation) {
            const loc = node.sourceCodeLocation;

            // Range do start tag inteiro: loc.startTag
            if (loc.startTag) {
                // "<" e ">" do start tag
                push("tagBeginBracket", loc.startTag.startOffset, loc.startTag.startOffset + 1);
                push("tagEndBracket", loc.startTag.endOffset - 1, loc.startTag.endOffset);

                // Nome da tag: logo depois de "<"
                // (heurística simples baseada no texto original)
                const startTagText = html.slice(loc.startTag.startOffset, loc.startTag.endOffset);
                const m = startTagText.match(/^<\s*([^\s/>]+)/);
                if (m && m.index === 0) {
                    const tagName = m[1];
                    const nameStart = loc.startTag.startOffset + startTagText.indexOf(tagName);
                    push("tagName", nameStart, nameStart + tagName.length);
                }

                // Atributos: loc.attrs é um mapa name(lowercase) -> Location
                // Isso dá offsets exatos do trecho do atributo no start tag. :contentReference[oaicite:3]{index=3}
                if (loc.attrs) {
                    for (const aLoc of Object.values(loc.attrs)) {
                        // aLoc cobre "name=..."; você pode refinar para separar name/value
                        const attrText = html.slice(aLoc.startOffset, aLoc.endOffset);

                        // name (até espaço/=)
                        const eq = attrText.indexOf("=");
                        if (eq === -1) {
                            // atributo booleano: "disabled"
                            push("attrName", aLoc.startOffset, aLoc.endOffset);
                        } else {
                            push("attrName", aLoc.startOffset, aLoc.startOffset + eq);

                            push("attrAssign", aLoc.startOffset + eq, aLoc.startOffset + eq + 1);

                            // value (tudo depois do "=")
                            const valueStart = aLoc.startOffset + eq + 1;
                            push("attrValue", valueStart, aLoc.endOffset);
                        }
                    }
                }
            }

            // End tag (se existir)
            if (loc.endTag) {
                push("tagBeginBracket", loc.endTag.startOffset, loc.endTag.startOffset + 2); // "</"
                push("tagEndBracket", loc.endTag.endOffset - 1, loc.endTag.endOffset);     // ">"

                const endTagText = html.slice(loc.endTag.startOffset, loc.endTag.endOffset);
                const m2 = endTagText.match(/^<\/\s*([^\s>]+)/);
                if (m2 && m2.index === 0) {
                    const tagName = m2[1];
                    const nameStart = loc.endTag.startOffset + endTagText.indexOf(tagName);
                    push("tagName", nameStart, nameStart + tagName.length);
                }
            }
        }

        // Children
        if (node.childNodes) {
            for (const c of node.childNodes) walk(c as DefaultTreeAdapterTypes.Element);
        }
    }

    walk(doc as any);

    // Importante: as chaves de loc.attrs podem vir em lowercase (ex.: viewBox vira viewbox)
    // então, se você quiser mapear por node.attrs, normalize. :contentReference[oaicite:4]{index=4}

    // Ordena por posição
    tokens.sort((a, b) => a.start - b.start || a.end - b.end);

    return tokens;
}