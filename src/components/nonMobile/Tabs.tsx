import CodeTab from "./CodeTab";
import themes from "../../utils/themes";
import type { AvailableOrientations, AvailableThemes, File } from "../../main";

export default function Tabs({
    orientation,
    openedFiles,
    selectedFile,
    changeFileContent,
    selectFile,
    closeFile,
    theme
}: {
    orientation: AvailableOrientations,
    openedFiles: File[],
    selectedFile: File,
    changeFileContent: (content: string) => void,
    selectFile: (fileName: string) => void,
    closeFile: (fileName: string) => void,
    theme: AvailableThemes
}) {
    return <main style={{ flexDirection: orientation === "backwards" ? "row" : "row-reverse" }}>
        <div id="browser">
            <header>
                <button>
                    <span>{`http://localhost/${selectedFile.name}`}</span>
                </button>
            </header>
            <iframe srcDoc={selectedFile.content} />
        </div>
        <div
            id="files"
            style={{
                borderLeft: orientation === "backwards" ? "1px solid var(--componentSeparatorBorderColor)" : undefined,
                borderRight: orientation === "forwards" ? "1px solid var(--componentSeparatorBorderColor)" : undefined
            }}
        >
            <header>
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
            </header>
            <div className="tabBody">
                <CodeTab
                    code={selectedFile.content}
                    changeFileContent={changeFileContent}
                />
            </div>
        </div>
    </main>;
}