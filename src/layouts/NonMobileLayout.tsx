import Buttons from "../components/nonMobile/Buttons";
import PrimarySideBar from "../components/nonMobile/PrimarySideBar";
import Tabs from "../components/nonMobile/Tabs";
import type { File } from "../main";
import type themes from "../utils/themes";

export default function NonMobileLayout({
    changeLang,
    theme,
    changeTheme,
    orientation,
    changeOrientation,
    files,
    selectedFile,
    changeFileContent,
    selectFile,
    closeFile
}: {
    changeLang: (lang: "pt-br" | "en") => void,
    theme: keyof typeof themes,
    changeTheme: (theme: keyof typeof themes) => void,
    orientation: "backwards" | "forwards",
    changeOrientation: (orientation: "backwards" | "forwards") => void,
    files: File[],
    selectedFile: File,
    changeFileContent: (content: string) => void,
    selectFile: (fileName: string) => void,
    closeFile: (fileName: string) => void,
}) {
    const openedFiles = files.filter(f => f.isOpen);

    const orderedChildren = [
        <Tabs
            orientation={orientation}
            openedFiles={openedFiles}
            selectedFile={selectedFile}
            changeFileContent={changeFileContent}
            selectFile={selectFile}
            closeFile={closeFile}
            theme={theme}
        />,
        <PrimarySideBar
            files={files}
            selectedFile={selectedFile}
            selectFile={selectFile}
            theme={theme}
        />,
        <Buttons />
    ];

    return orientation === "backwards" ?
        orderedChildren
        :
        [ ...orderedChildren ].reverse();
}