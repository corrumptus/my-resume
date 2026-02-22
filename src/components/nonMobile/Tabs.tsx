import type { File } from "../../main";
import CodeTab from "./CodeTab";
import type themes from "../../utils/themes";

export default function Tabs({
    orientation,
    openedFiles,
    selectedFile,
    changeFileContent,
    selectFile,
    closeFile,
    theme
}: {
    orientation: "backwards" | "forwards",
    openedFiles: File[],
    selectedFile: File,
    changeFileContent: (content: string) => void,
    selectFile: (fileName: string) => void,
    closeFile: (fileName: string) => void,
    theme: keyof typeof themes
}) {
    return <main> {/*style={{ flexDirection: orientation === "backwards" ? "row" : "revert" }}*/}
        <div id="browser">
            <header>
                <button key={selectedFile.name}>
                    <span>{selectedFile.name}</span>
                </button>
            </header>
            <div className="tabBody">
                <iframe srcDoc={selectedFile.content} />
            </div>
        </div>
        <div id="files">
            <header>
                {openedFiles.map(f =>
                    <button key={f.name} onClick={() => selectFile(f.name)}>
                        {f === selectedFile && <div className="selectedBorder"></div>}
                        <span>{f.name}</span>
                        <span onClick={() => closeFile(f.name)}>
                            <div className="stick primary"></div>
                            <div className="stick secondary"></div>
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