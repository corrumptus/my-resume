import { useRef, type RefObject } from "react";
import type { File } from "../../main";
import htmlHighlighter from "../../utils/html-highlighter";

export default function TabVisualizer({
    selectedFile,
    changeFileContent
}: {
    selectedFile: File,
    changeFileContent: (content: string) => void
}) {
    const preRef = useRef<HTMLPreElement>(null) as RefObject<HTMLPreElement>;
    const taRef = useRef<HTMLTextAreaElement>(null) as RefObject<HTMLTextAreaElement>;

    const highlighted = htmlHighlighter(selectedFile.content);

    function syncScroll() {
        preRef.current.scrollTop = taRef.current.scrollTop;
        preRef.current.scrollLeft = taRef.current.scrollLeft;
    }

    return <main>
        <div id="files">
            <div className="code">
                <pre
                    ref={preRef}
                    aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: highlighted }}
                />
                <textarea
                    ref={taRef}
                    value={selectedFile.content}
                    onChange={e => changeFileContent(e.target.value)}
                    onScroll={syncScroll}
                    spellCheck={false}
                />
            </div>
        </div>
        <div id="browser">
            <iframe srcDoc={selectedFile.content} />
        </div>
    </main>;
}