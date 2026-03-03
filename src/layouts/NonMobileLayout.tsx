import Buttons from "../components/nonMobile/Buttons";
import PrimarySideBar from "../components/nonMobile/PrimarySideBar";
import SettingsModal from "../components/nonMobile/SettingsModal";
import Tabs from "../components/nonMobile/Tabs";
import type { AvailableLangs, AvailableOrientations, AvailableThemes, File } from "../main";

export default function NonMobileLayout({
    lang,
    changeLang,
    theme,
    changeTheme,
    orientation,
    changeOrientation,
    files,
    selectedFile,
    newFile,
    changeFileContent,
    selectFile,
    closeFile,
    selectedSideBar,
    changeSelectedSideBar,
    download,
    settingsPosition,
    changeSettingsPosition
}: {
    lang: AvailableLangs,
    changeLang: (lang: AvailableLangs) => void,
    theme: AvailableThemes,
    changeTheme: (theme: AvailableThemes) => void,
    orientation: AvailableOrientations,
    changeOrientation: (orientation: AvailableOrientations) => void,
    files: File[],
    selectedFile: File,
    newFile: (name: string) => void,
    changeFileContent: (content: string) => void,
    selectFile: (fileName: string) => void,
    closeFile: (fileName: string) => void,
    selectedSideBar: "files" | "chat" | undefined,
    changeSelectedSideBar: (sideBar: "files" | "chat") => void,
    download: () => void,
    settingsPosition: { x: number, y: number } | undefined,
    changeSettingsPosition: (pos: { x: number, y: number } | undefined) => void
}) {
    const openedFiles = files.filter(f => f.isOpen);

    const orderedChildren = [
        <Tabs
            key={0}
            orientation={orientation}
            openedFiles={openedFiles}
            selectedFile={selectedFile}
            changeFileContent={changeFileContent}
            selectFile={selectFile}
            closeFile={closeFile}
            theme={theme}
        />,
        <PrimarySideBar
            key={1}
            lang={lang}
            files={files}
            newFile={newFile}
            selectedFile={selectedFile}
            selectFile={selectFile}
        />,
        <Buttons
            key={2}
            selectedSideBar={selectedSideBar}
            changeSelectedSideBar={changeSelectedSideBar}
            download={download}
            openSettings={(e, pos) => {settingsPosition === undefined && e.stopPropagation(); changeSettingsPosition(pos);}}
            orientation={orientation}
            lang={lang}
            theme={theme}
        />
    ];

    return <>
        {orientation === "backwards" ?
            orderedChildren
            :
            [ ...orderedChildren ].reverse()
        }
        <SettingsModal
            position={settingsPosition}
            updatePosition={changeSettingsPosition}
            closeSettings={() => changeSettingsPosition(undefined)}
            lang={lang}
            changeLang={changeLang}
            orientation={orientation}
            changeOrientation={changeOrientation}
            theme={theme}
            changeTheme={changeTheme}
        />
    </>;
}