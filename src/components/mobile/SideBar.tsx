import FilesMenu from "./FilesMenu";
import SettingsMenu from "./SettingsMenu";
import type { AvailableLangs, AvailableThemes, File } from "../../main";

export default function SideBar({
    lang,
    changeLang,
    theme,
    changeTheme,
    files,
    selectedFile,
    newFile,
    selectFile,
    removeFile,
    isOpen,
    switchIsOpen,
    selectedMenu,
    changeSelectedMenu,
    download,
    downloadFile
}: {
    lang: AvailableLangs,
    changeLang: (lang: AvailableLangs) => void,
    theme: AvailableThemes,
    changeTheme: (theme: AvailableThemes) => void,
    files: File[],
    selectedFile: File,
    newFile: (fileName: string) => void,
    selectFile: (fileName: string) => void,
    removeFile: (fileName: string) => void,
    isOpen: boolean,
    switchIsOpen: () => void,
    selectedMenu: "files" | "chat" | "settings",
    changeSelectedMenu: (menu: "files" | "chat" | "settings") => void,
    download: () => void,
    downloadFile: (file: File) => void
}) {
    return <nav
        style={{
            transform: isOpen ? "translateX(0)" : "translateX(calc(100% - 42px))",
            opacity: isOpen ? 1 : .4
        }}
    >
        <button id="openClose" onClick={switchIsOpen}>
            <img
                src="https://raw.githubusercontent.com/microsoft/vscode-codicons/d75c4786e4b95dd882b00f93c7da379397f5fd65/src/icons/chevron-right.svg"
                alt="a chevron icon"
                style={{ transform: isOpen ? "rotate(0deg)" : "rotate(-180deg)" }}
            />
        </button>
        <div id="navButtons" className={selectedMenu + "Selected"}>
            <button
                onClick={() => changeSelectedMenu("files")}
            >
                <img src="https://raw.githubusercontent.com/microsoft/vscode-codicons/542ec2a3375b21d42d4b75a995c4feb896aad305/src/icons/files.svg" alt="a file(paper with the top right corner folded) on the top of other file" />
            </button>
            <button
                onClick={() => changeSelectedMenu("chat")}
            >
                <img src="https://raw.githubusercontent.com/microsoft/vscode-codicons/542ec2a3375b21d42d4b75a995c4feb896aad305/src/icons/copilot.svg" alt="the copilot logo" />
            </button>
            <button
                onClick={() => changeSelectedMenu("settings")}
            >
                <img src="https://raw.githubusercontent.com/microsoft/vscode-codicons/542ec2a3375b21d42d4b75a995c4feb896aad305/src/icons/settings-gear.svg" alt="a gear" />
            </button>
        </div>
        {selectedMenu === "files" &&
            <FilesMenu
                lang={lang}
                theme={theme}
                files={files}
                selectedFile={selectedFile}
                newFile={newFile}
                selectFile={selectFile}
                removeFile={removeFile}
                download={download}
                downloadFile={downloadFile}
            />
        }
        {selectedMenu === "settings" &&
            <SettingsMenu
                lang={lang}
                changeLang={changeLang}
                theme={theme}
                changeTheme={changeTheme}
            />
        }
    </nav>;
}