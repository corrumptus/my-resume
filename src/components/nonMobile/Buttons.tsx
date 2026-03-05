import type { MouseEvent } from "react";
import type { AvailableLangs, AvailableOrientations, AvailableThemes } from "../../main";
import themes from "../../utils/themes";

export default function Buttons({
    selectedSideBar,
    changeSelectedSideBar,
    download,
    openSettings,
    orientation,
    lang,
    theme,
    changeModal
}: {
    selectedSideBar: "files" | "chat" | undefined,
    changeSelectedSideBar: (sideBar: "files" | "chat") => void,
    download: () => void,
    openSettings: (e: MouseEvent, pos: { x: number, y: number }) => void,
    orientation: AvailableOrientations,
    lang: AvailableLangs,
    theme: AvailableThemes,
    changeModal: (modal: "newFile" | "options" | "settings" | undefined) => void
}) {
    return <nav>
        <button
            onClick={() => changeSelectedSideBar("files")}
            title={lang === "pt-br" ? "Arquivos" : "Files"}
            style={selectedSideBar === "files" ? {
                [orientation === "backwards" ? "borderRightColor" : "borderLeftColor"]: themes[theme].selectedThing
            } : undefined}
        >
            <img src="https://raw.githubusercontent.com/microsoft/vscode-codicons/542ec2a3375b21d42d4b75a995c4feb896aad305/src/icons/files.svg" alt="a file(paper with the top right corner folded) on the top of other file" />
        </button>
        <button
            onClick={() => changeSelectedSideBar("chat")}
            title={lang === "pt-br" ? "Converse comigo" : "Chat with me"}
            style={selectedSideBar === "chat" ? {
                [orientation === "backwards" ? "borderRightColor" : "borderLeftColor"]: themes[theme].selectedThing
            } : undefined}
        >
            <img src="https://raw.githubusercontent.com/microsoft/vscode-codicons/542ec2a3375b21d42d4b75a995c4feb896aad305/src/icons/copilot.svg" alt="the copilot logo" />
        </button>
        <button
            onClick={download}
            title={lang === "pt-br" ? "Baixar currículo" : "Download resume"}
        >
            <img src="https://raw.githubusercontent.com/microsoft/vscode-codicons/542ec2a3375b21d42d4b75a995c4feb896aad305/src/icons/download.svg" alt="a arrow pointing to the bottom" />
        </button>
        <button
            onClick={e => { changeModal("settings"); openSettings(e, { x: e.clientX, y: e.clientY }); }}
            title={lang === "pt-br" ? "Configurações" : "Settings"}
        >
            <img src="https://raw.githubusercontent.com/microsoft/vscode-codicons/542ec2a3375b21d42d4b75a995c4feb896aad305/src/icons/settings-gear.svg" alt="a gear" />
        </button>
    </nav>;
}