import type { AvailableThemes, File } from "../../main";
import themes from "../../utils/themes";

export default function TabHeader({
    openedFiles,
    selectedFile,
    selectFile,
    closeFile,
    theme
}: {
    openedFiles: File[],
    selectedFile: File,
    selectFile: (fileName: string) => void,
    closeFile: (fileName: string) => void,
    theme: AvailableThemes
}) {
    return <header id="tabHeader">
        {openedFiles.map((f, i) =>
            <button
                key={f.name}
                onClick={() => selectFile(f.name)}
                style={{
                    backgroundColor: f.name === selectedFile.name ?
                        themes[theme].focusedTabFileBgColor
                        :
                        themes[theme].standbyTabFileBgColor,
                    color: f.name === selectedFile.name ?
                        themes[theme].focusedTabFileNameColor
                        :
                        themes[theme].standbyTabFileNameColor,
                    borderTopColor: f.name === selectedFile.name ?
                        themes[theme].selectedThing
                        :
                        undefined,
                    padding: i === 0 ? ".6em 1em" : undefined
                }}
            >
                <span>{f.name}</span>
                <span
                    id="close"
                    onClick={e => { e.stopPropagation(); closeFile(f.name); }}
                    onMouseEnter={e => (e.target as HTMLSpanElement).style.opacity = i !== 0 ? "1" : "0"}
                    onMouseLeave={e => (e.target as HTMLSpanElement).style.opacity = i !== 0 && f.name === selectedFile.name ? "1" : "0"}
                    style={{
                        opacity: i !== 0 && f.name === selectedFile.name ? "1" : "0",
                        display: i === 0 ? "none" : "block"
                    }}
                ></span>
            </button>
        )}
    </header>;
}