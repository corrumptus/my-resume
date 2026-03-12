import { useEffect, useState, type KeyboardEvent } from "react";
import themes from "../../utils/themes";
import type { AvailableLangs, AvailableThemes, File } from "../../main";

export default function FilesMenu({
    lang,
    theme,
    files,
    selectedFile,
    newFile,
    selectFile,
    removeFile,
    download,
    downloadFile
}: {
    lang: AvailableLangs,
    theme: AvailableThemes,
    files: File[],
    selectedFile: File,
    newFile: (fileName: string) => void,
    selectFile: (fileName: string) => void,
    removeFile: (fileName: string) => void,
    download: () => void,
    downloadFile: (file: File) => void
}) {
    const [ newFileName, setNewFile ] = useState<string>();

    useEffect(() => {
        if (newFileName === undefined)
            return;

        (document.querySelector("nav .menu.files #newFileInput input") as HTMLInputElement).focus();
    }, [newFileName]);

    function onClick() {
        if (
            newFileName === "currículo"
            ||
            newFileName === "resume"
        )
            return;

        if (newFileName!.trim() !== "")
            newFile(newFileName + ".html");

        setNewFile(undefined);
    }

    function onKeyDown(e: KeyboardEvent) {
        if (e.key === "Enter")
            onClick();
    }

    function textColor() {
        if (
            newFileName === "currículo"
            ||
            newFileName === "resume"
        )
            return "red";
        return undefined;
    }

    return <div className="menu files">
        {newFileName === undefined ?
            <button onClick={() => setNewFile("")} id="newFileButton">
                <span>
                    <img
                        src="https://raw.githubusercontent.com/microsoft/vscode-codicons/645a51d1334b455269642296866e9a30badde0c3/src/icons/new-file.svg"
                        alt="a paper with the top right corner folded and a plus icon in the bottom right"
                    />
                </span>
                <span>
                    {lang === "pt-br" ? "Novo arquivo" : "New file"}
                </span>
            </button>
            :
            <div id="newFileInput">
                <input
                    value={newFileName}
                    onChange={e => setNewFile(e.target.value)}
                    onKeyDown={onKeyDown}
                    style={{ color: textColor() }}
                />
                <span>.html</span>
                <button onClick={onClick}>
                    <img src="https://raw.githubusercontent.com/microsoft/vscode-codicons/d75c4786e4b95dd882b00f93c7da379397f5fd65/src/icons/send.svg" alt="a chevron with a line in the middle connecting the two corners" />
                </button>
            </div>
        }
        <button onClick={download} id="downloadButton">
            <span>
                <img
                    src="https://raw.githubusercontent.com/microsoft/vscode-codicons/645a51d1334b455269642296866e9a30badde0c3/src/icons/new-file.svg"
                    alt="a paper with the top right corner folded and a plus icon in the bottom right"
                />
            </span>
            <span>
                {lang === "pt-br" ? "Baixar currículo" : "Download resume"}
            </span>
        </button>
        <button onClick={() => downloadFile(selectedFile)} id="downloadFileButton">
            <span>
                <img
                    src="https://raw.githubusercontent.com/microsoft/vscode-codicons/645a51d1334b455269642296866e9a30badde0c3/src/icons/new-file.svg"
                    alt="a paper with the top right corner folded and a plus icon in the bottom right"
                />
            </span>
            <span>
                {lang === "pt-br" ? "Baixar arquivo selecionado" : "Download selected file"}
            </span>
        </button>
        <ul>
            {files.map((f, i) =>
                <li
                    key={f.name}
                    onClick={() => selectFile(f.name)}
                    style={{
                        backgroundColor: f.name === selectedFile.name ?
                            themes[theme].folderSelectedFileBgColor
                            :
                            undefined
                    }}
                >
                    <span>{f.name}</span>
                    <button
                        onClick={e => { e.stopPropagation(); removeFile(f.name); }}
                        style={{ display: i === 0 ? "none" : "block" }}
                    >
                        <img src="https://raw.githubusercontent.com/microsoft/vscode-codicons/d75c4786e4b95dd882b00f93c7da379397f5fd65/src/icons/trash.svg" alt="trash" />
                    </button>
                </li>
            )}
        </ul>
    </div>;
}