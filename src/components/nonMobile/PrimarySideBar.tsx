import { useEffect, useState, type KeyboardEvent } from "react";
import type { AvailableLangs, AvailableOrientations, File } from "../../main";

export default function PrimarySideBar({
    lang,
    orientation,
    files,
    newFile,
    selectedFile,
    selectFile,
    download,
    remove
}: {
    lang: AvailableLangs,
    orientation: AvailableOrientations,
    files: File[],
    newFile: (name: string) => void,
    selectedFile: File,
    selectFile: (fileName: string) => void,
    download: (fileName: string) => void,
    remove: (fileName: string) => void
}) {
    const [ isVisible, setIsVisible ] = useState(false);
    const [ newFileName, setNewFileName ] = useState("");
    const [ option, setOptions ] = useState<{ x: number, y: number, file: string, index: number }>();

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

        function onAuxClick() {
            setIsVisible(false);
            setNewFileName("");
            setOptions(prevOptions => {
                if (prevOptions === undefined)
                    return undefined;
                
                return {
                    ...prevOptions,
                    y: prevOptions.y - 26
                };
            });
        }

        window.addEventListener("click", onClick);
        window.addEventListener("auxclick", onAuxClick);

        return () => {
            window.removeEventListener("click", onClick);
            window.removeEventListener("auxclick", onAuxClick);
        };
    }, [isVisible]);

    useEffect(() => {
        if (option === undefined)
            return;

        function onClick(e: MouseEvent) {
            if (
                (e.target as Element).closest(`#options button`) !== null
                ||
                (e.target as Element).closest(`#options`) === null
            ) {
                setOptions(undefined);
            }
        }

        window.addEventListener("click", onClick);

        return () => window.removeEventListener("click", onClick);
    }, [option?.x, option?.y]);

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
            {files.map((f, i) =>
                <li
                    key={f.name}
                    onClick={() => selectFile(f.name)}
                    onContextMenu={e => { e.preventDefault(); setOptions({ x: e.clientX, y: e.clientY, file: f.name, index: i }); }}
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
                opacity: option !== undefined ? 100 : 0,
                pointerEvents: option !== undefined ? "auto" : "none"
            }}
        >
            <button onClick={() => download(option!.file)}>{lang === "pt-br" ? "Baixar arquivo" : "Download file"}</button>
            <button onClick={() => remove(option!.file)}>{lang === "pt-br" ? "Excluir arquivo" : "Delete file"}</button>
        </div>
    </aside>;
}