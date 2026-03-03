import { useEffect, useState, type KeyboardEvent } from "react";
import type { AvailableLangs, File } from "../../main";

export default function PrimarySideBar({
    lang,
    files,
    newFile,
    selectedFile,
    selectFile
}: {
    lang: AvailableLangs,
    files: File[],
    newFile: (name: string) => void,
    selectedFile: File,
    selectFile: (fileName: string) => void
}) {
    const [ isVisible, setIsVisible ] = useState(false);
    const [ newFileName, setNewFileName ] = useState("");

    useEffect(() => {
        if (!isVisible)
            return;

        (document.querySelector("#newFileInput input") as HTMLInputElement).focus();

        function onClick(e: MouseEvent) {
            if ((e.target as Element).closest("#newFileInput") === null) {
                setIsVisible(false);
                setNewFileName("");
            }
        }

        window.addEventListener("click", onClick);

        return () => window.removeEventListener("click", onClick);
    }, [isVisible]);

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
            setNewFileName("");
            setIsVisible(false);
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
                onClick={e => {!isVisible && e.stopPropagation(); setIsVisible(true);}}
                title={lang === "pt-br" ? "Criar novo arquivo" : "create new file"}
            >
                <img
                    src="https://raw.githubusercontent.com/microsoft/vscode-codicons/645a51d1334b455269642296866e9a30badde0c3/src/icons/new-file.svg"
                    alt="a paper with the top right corner folded and a plus icon in the bottom right"
                />
            </button>
        </header>
        <ul>
            <li id="newFileInput" style={{ display: isVisible ? "flex" : "none" }}>
                <input
                    value={newFileName}
                    onKeyDown={onKeyDown}
                    onChange={e => setNewFileName(e.target.value)}
                    style={{ color: textColor() }}
                />
                <span>.html</span>
            </li>
            {files.map(f =>
                <li
                    key={f.name}
                    onClick={() => selectFile(f.name)}
                    className={selectedFile.name === f.name ? "selected" : ""}
                >
                    {f.name}
                </li>
            )}
        </ul>
    </aside>;
}