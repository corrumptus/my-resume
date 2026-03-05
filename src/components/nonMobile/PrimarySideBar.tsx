import { useEffect, useState, type KeyboardEvent, type MouseEvent } from "react";
import type { AvailableLangs, AvailableOrientations, File } from "../../main";

export default function PrimarySideBar({
    lang,
    orientation,
    files,
    newFile,
    selectedFile,
    selectFile,
    download,
    remove,
    modal,
    changeModal,
    option,
    changeOption
}: {
    lang: AvailableLangs,
    orientation: AvailableOrientations,
    files: File[],
    newFile: (name: string) => void,
    selectedFile: File,
    selectFile: (fileName: string) => void,
    download: (file: File) => void,
    remove: (fileName: string) => void,
    modal: "newFile" | "options" | "settings" | undefined,
    changeModal: (modal: "newFile" | "options" | "settings" | undefined) => void,
    option: { x: number, y: number, file: File, index: number } | undefined,
    changeOption: (option: { x: number, y: number, file: File, index: number } | undefined) => void
}) {
    const [ newFileName, setNewFileName ] = useState("");

    useEffect(() => {
        if (modal !== "newFile")
            return;

        (document.querySelector("#newFileInput input") as HTMLInputElement).focus();

        return () => {
            setNewFileName("");
        };
    }, [modal]);

    function handleNewFileClick(e: MouseEvent) {
        if (modal !== "newFile")
            e.stopPropagation();

        changeModal("newFile");
    }

    useEffect(() => {
        if (modal !== "options")
            return;

        return () => {
            changeOption(undefined);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modal]);

    function handleOptionsAuxClick(e: MouseEvent, f: File, i: number) {
        e.preventDefault();

        if (modal !== "options")
            e.stopPropagation();

        if (modal === "newFile")
            changeOption({ x: e.clientX, y: e.clientY - 26, file: f, index: i });
        else
            changeOption({ x: e.clientX, y: e.clientY, file: f, index: i });

        changeModal("options");
    }

    function onKeyDown(e: KeyboardEvent) {
        if (e.key === "Enter") {
            if (
                newFileName === "currículo"
                ||
                newFileName === "resume"
            )
                return;

            e.preventDefault();
            newFile(newFileName + ".html");
            changeModal(undefined);
        }
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

    return <aside>
        <header>
            <span>Lucas Lazarini</span>
            <button
                onClick={handleNewFileClick}
                title={lang === "pt-br" ? "Criar novo arquivo" : "create new file"}
            >
                <img
                    src="https://raw.githubusercontent.com/microsoft/vscode-codicons/645a51d1334b455269642296866e9a30badde0c3/src/icons/new-file.svg"
                    alt="a paper with the top right corner folded and a plus icon in the bottom right"
                />
            </button>
        </header>
        <ul>
            <li id="newFileInput" style={{ display: modal === "newFile" ? "flex" : "none" }}>
                <input
                    value={newFileName}
                    onKeyDown={onKeyDown}
                    onChange={e => setNewFileName(e.target.value)}
                    style={{ color: textColor() }}
                />
                <span>.html</span>
            </li>
            {files.map((f, i) =>
                <li
                    key={f.name}
                    onClick={() => selectFile(f.name)}
                    onContextMenu={e => handleOptionsAuxClick(e, f, i)}
                    className={selectedFile.name === f.name ? "selected" : ""}
                >
                    {f.name}
                </li>
            )}
        </ul>
        <div
            id="options"
            style={{
                right: orientation === "backwards" ? `calc(100% - ${option?.x}px)` : undefined,
                left: orientation === "forwards" ? option?.x : undefined,
                top: option?.y,
                opacity: modal === "options" ? 100 : 0,
                pointerEvents: modal === "options" ? "auto" : "none"
            }}
        >
            <button onClick={() => download(option!.file)}>{lang === "pt-br" ? "Baixar arquivo" : "Download file"}</button>
            <button onClick={() => remove(option!.file.name)}>{lang === "pt-br" ? "Excluir arquivo" : "Delete file"}</button>
        </div>
    </aside>;
}