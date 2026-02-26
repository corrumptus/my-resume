import Buttons from "../components/nonMobile/Buttons";
import PrimarySideBar from "../components/nonMobile/PrimarySideBar";
import Tabs from "../components/nonMobile/Tabs";
import type { File } from "../main";
import type themes from "../utils/themes";

export default function NonMobileLayout({
    lang,
    theme,
    orientation,
    files,
    selectedFile,
    changeFileContent,
    selectFile,
    closeFile,
    selectedSideBar,
    changeSelectedSideBar,
    download,
    openSettings
}: {
    lang: "pt-br" | "en",
    theme: keyof typeof themes,
    orientation: "backwards" | "forwards",
    files: File[],
    selectedFile: File,
    changeFileContent: (content: string) => void,
    selectFile: (fileName: string) => void,
    closeFile: (fileName: string) => void,
    selectedSideBar: "files" | "chat" | undefined,
    changeSelectedSideBar: (sideBar: "files" | "chat") => void,
    download: () => void,
    openSettings: () => void
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
            files={files}
            selectedFile={selectedFile}
            selectFile={selectFile}
        />,
        <Buttons
            key={2}
            selectedSideBar={selectedSideBar}
            changeSelectedSideBar={changeSelectedSideBar}
            download={download}
            openSettings={openSettings}
            orientation={orientation}
            lang={lang}
            theme={theme}
        />
    ];

    return orientation === "backwards" ?
        orderedChildren
        :
        [ ...orderedChildren ].reverse();
}