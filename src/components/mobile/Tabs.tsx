import { useEffect, useRef, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import type { AvailableThemes, File } from "../../main";

export default function TabVisualizer({
    selectedFile,
    changeFileContent,
    theme
}: {
    selectedFile: File,
    changeFileContent: (content: string) => void,
    theme: AvailableThemes
}) {
    const [ size, setSize ] = useState({ width: 0, height: 0 });
    const main = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ro = new ResizeObserver(() => {
            setSize({ width: main.current?.clientWidth || 0, height: main.current?.clientHeight || 0 });
        });

        ro.observe(main.current!);

        return () => ro.disconnect();
    }, [size.width, size.height]);

    return <main ref={main}>
        <MonacoEditor
            width={size.width}
            height="50%"
            value={selectedFile.content}
            onChange={changeFileContent}
            language="html"
            theme={theme}
            options={{
                minimap: {
                    enabled: false
                }
            }}
        />
        <div id="browser">
            <iframe srcDoc={selectedFile.content} />
        </div>
    </main>;
}