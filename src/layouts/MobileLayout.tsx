import SideBar from "../components/mobile/SideBar";
import TabHeader from "../components/mobile/TabHeader";
import Tabs from "../components/mobile/Tabs";
import type { AvailableLangs, AvailableThemes, File } from "../main";

export default function MobileLayout({
    lang,
    changeLang,
    theme,
    changeTheme,
    files,
    selectedFile,
    newFile,
    changeFileContent,
    selectFile,
    closeFile,
    selectedMenu,
    changeSelectedMenu,
    download,
    downloadFile,
    remove,
    isOpen,
    switchIsOpen
}: {
    lang: AvailableLangs,
    changeLang: (lang: AvailableLangs) => void,
    theme: AvailableThemes,
    changeTheme: (theme: AvailableThemes) => void,
    files: File[],
    selectedFile: File,
    newFile: (name: string) => void,
    changeFileContent: (content: string) => void,
    selectFile: (fileName: string) => void,
    closeFile: (fileName: string) => void,
    selectedMenu: "files" | "chat" | "settings",
    changeSelectedMenu: (menu: "files" | "chat" | "settings") => void,
    download: () => void,
    downloadFile: (file: File) => void,
    remove: (fileName: string) => void,
    isOpen: boolean,
    switchIsOpen: () => void
}) {
    const openedFiles = files.filter(f => f.isOpen);

    return <>
        <TabHeader
            openedFiles={openedFiles}
            selectedFile={selectedFile}
            selectFile={selectFile}
            closeFile={closeFile}
            theme={theme}
        />
        <Tabs
            selectedFile={selectedFile}
            changeFileContent={changeFileContent}            
        />
        <SideBar
            lang={lang}
            changeLang={changeLang}
            theme={theme}
            changeTheme={changeTheme}
            files={files}
            selectedFile={selectedFile}
            newFile={newFile}
            selectFile={selectFile}
            removeFile={remove}
            isOpen={isOpen}
            switchIsOpen={switchIsOpen}
            selectedMenu={selectedMenu}
            changeSelectedMenu={changeSelectedMenu}
            download={download}
            downloadFile={downloadFile}
        />
    </>;
}