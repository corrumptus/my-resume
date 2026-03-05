import { useRef, type RefObject } from "react";
import htmlHighlighter from "../../utils/html-highlighter";

export default function CodeTab({
    code,
    setCode
}: {
    code: string,
    setCode: (code: string) => void
}) {
    const preRef = useRef<HTMLPreElement>(null) as RefObject<HTMLPreElement>;
    const taRef = useRef<HTMLTextAreaElement>(null) as RefObject<HTMLTextAreaElement>;

    const highlighted = htmlHighlighter(code);

    function syncScroll() {
        preRef.current.scrollTop = taRef.current.scrollTop;
        preRef.current.scrollLeft = taRef.current.scrollLeft;
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
            onChange={e => setCode(e.target.value)}
            onScroll={syncScroll}
            spellCheck={false}
        />
    </div>;
} 