import { useRef, type RefObject } from "react";
import htmlHighlighter from "../../utils/html-highlighter";
import themes from "../../utils/themes";

export default function CodeTab({
    code,
    setCode,
    theme
}: {
    code: string,
    setCode: (code: string) => void,
    theme: keyof typeof themes
}) {
    const preRef = useRef<HTMLPreElement>(null) as RefObject<HTMLPreElement>;
    const taRef = useRef<HTMLTextAreaElement>(null) as RefObject<HTMLTextAreaElement>;

    const highlighted = htmlHighlighter(code, themes[theme]);

    function syncScroll() {
        preRef.current!.scrollTop = taRef.current.scrollTop;
        preRef.current!.scrollLeft = taRef.current.scrollLeft;
    }

    return <div className="code" style={{ backgroundColor: themes[theme].secondaryBgColor }}>
        <pre
            ref={preRef}
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: highlighted + "\n" }}
        />
        <textarea
            ref={taRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onScroll={syncScroll}
            spellCheck={false}
        />
    </div>;
} 