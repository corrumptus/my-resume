import { useRef, type KeyboardEvent, type RefObject } from "react";
import htmlHighlighter from "../../utils/html-highlighter";

export default function CodeTab({
    code,
    changeFileContent
}: {
    code: string,
    changeFileContent: (code: string) => void
}) {
    const preRef = useRef<HTMLPreElement>(null) as RefObject<HTMLPreElement>;
    const taRef = useRef<HTMLTextAreaElement>(null) as RefObject<HTMLTextAreaElement>;

    const highlighted = htmlHighlighter(code);

    function syncScroll() {
        preRef.current.scrollTop = taRef.current.scrollTop;
        preRef.current.scrollLeft = taRef.current.scrollLeft;
    }

    function onKeyDown(e: KeyboardEvent) {
        if (e.key !== 'Tab') return;

        e.preventDefault();

        const target = e.target as HTMLTextAreaElement;

        const start = target.selectionStart;
        const end = target.selectionEnd;
        const value = target.value;

        // SHIFT + TAB => remove indentação
        if (e.shiftKey) {
            const lineStart = value.lastIndexOf('\n', start - 1) + 1;
            const block = value.slice(lineStart, end);

            // Sem seleção: remove até 4 espaços da linha atual
            if (start === end) {
                const lineEnd = value.indexOf('\n', start);
                const realLineEnd = lineEnd === -1 ? value.length : lineEnd;
                const line = value.slice(lineStart, realLineEnd);

                const spacesToRemove = Math.min(4, (line.match(/^ */) || [''])[0].length);

                if (spacesToRemove > 0) {
                    target.value =
                        value.slice(0, lineStart) +
                        line.slice(spacesToRemove) +
                        value.slice(realLineEnd);

                    const newPos = Math.max(lineStart, start - spacesToRemove);
                    target.selectionStart = target.selectionEnd = newPos;
                }

                changeFileContent(target.value);

                return;
            }

            // Com seleção: remove até 4 espaços do início de cada linha
            const lines = block.split('\n');
            let removedFromFirstLine = 0;
            let totalRemoved = 0;

            const unindentedLines = lines.map((line, index) => {
                const leadingSpaces = (line.match(/^ */) || [''])[0].length;
                const removeCount = Math.min(4, leadingSpaces);

                if (index === 0) removedFromFirstLine = removeCount;
                totalRemoved += removeCount;

                return line.slice(removeCount);
            });

            const newBlock = unindentedLines.join('\n');

            target.value =
                value.slice(0, lineStart) +
                newBlock +
                value.slice(end);

            target.selectionStart = Math.max(lineStart, start - removedFromFirstLine);
            target.selectionEnd = end - totalRemoved;

            changeFileContent(target.value);
            return;
        }

        const INDENT = '    ';

        // TAB => adiciona indentação
        if (start === end) {
            target.value = value.slice(0, start) + INDENT + value.slice(end);
            target.selectionStart = target.selectionEnd = start + INDENT.length;

            changeFileContent(target.value);
            return;
        }

        const lineStart = value.lastIndexOf('\n', start - 1) + 1;
        const selectedText = value.slice(lineStart, end);
        const indentedText = INDENT + selectedText.replace(/\n/g, '\n' + INDENT);

        target.value =
            value.slice(0, lineStart) +
            indentedText +
            value.slice(end);

        target.selectionStart = lineStart;
        target.selectionEnd = lineStart + indentedText.length;

        changeFileContent(target.value);
    }

    return <div className="code">
        <pre
            ref={preRef}
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: highlighted }}
        />
        <textarea
            ref={taRef}
            value={code}
            onKeyDown={onKeyDown}
            onChange={e => changeFileContent(e.target.value)}
            onScroll={syncScroll}
            spellCheck={false}
        />
    </div>;
} 