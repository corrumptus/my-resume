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
    downloadFile,
    remove,
    settingsPosition,
    changeSettingsPosition,
    modal,
    changeModal,
    option,
    changeOption
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
    selectedSideBar: "files" | "chat",
    changeSelectedSideBar: (sideBar: "files" | "chat") => void,
    download: () => void,
    downloadFile: (file: File) => void,
    remove: (fileName: string) => void,
    settingsPosition: { x: number, y: number } | undefined,
    changeSettingsPosition: (pos: { x: number, y: number } | undefined) => void,
    modal: "newFile" | "options" | "settings" | undefined,
    changeModal: (modal: "newFile" | "options" | "settings" | undefined) => void,
    option: { x: number, y: number, file: File, index: number } | undefined,
    changeOption: (option: { x: number, y: number, file: File, index: number } | undefined) => void
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
            orientation={orientation}
            files={files}
            newFile={newFile}
            selectedFile={selectedFile}
            selectFile={selectFile}
            download={downloadFile}
            remove={remove}
            modal={modal}
            changeModal={changeModal}
            option={option}
            changeOption={changeOption}
        />,
        <Buttons
            key={2}
            selectedSideBar={selectedSideBar}
            changeSelectedSideBar={changeSelectedSideBar}
            download={download}
            openSettings={(e, pos) => { modal !== "settings" && e.stopPropagation(); changeSettingsPosition(pos); }}
            orientation={orientation}
            lang={lang}
            theme={theme}
            changeModal={changeModal}
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
            modal={modal}
        />
    </>;
}