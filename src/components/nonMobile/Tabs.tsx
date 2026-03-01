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
        <div id="files">
            <header>
                {openedFiles.map(f =>
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
                                themes[theme].standbyTabFileNameColor
                        }}
                    >
                        <span>{f.name}</span>
                        <span id="close" onClick={() => closeFile(f.name)}>
                            <div
                                className="stick primary"
                                style={{
                                    visibility: f.name === selectedFile.name ? "visible" : "hidden"
                                }}
                            >
                            </div>
                            <div
                                className="stick secondary"
                                style={{
                                    visibility: f.name === selectedFile.name ? "visible" : "hidden"
                                }}
                            >
                            </div>
                        </span>
                    </button>
                )}
            </header>
            <div className="tabBody">
                <CodeTab code={selectedFile.content} setCode={changeFileContent} theme={theme} />
            </div>
        </div>
    </main>;
}