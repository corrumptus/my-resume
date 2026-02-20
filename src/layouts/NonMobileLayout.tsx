import Tabs from "../components/nonMobile/Tabs";
import type { File } from "../main";
import themes from "../utils/themes";

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

    return orientation === "backwards" ?
        <>
            <Tabs
                orientation={orientation}
                openedFiles={openedFiles}
                selectedFile={selectedFile}
                changeFileContent={changeFileContent}
                selectFile={selectFile}
                closeFile={closeFile}
                theme={theme}
            />
            <PrimarySideBar />
            <Buttons />
        </>
        :
        <>
            <Buttons />
            <PrimarySideBar />
            <Tabs
                orientation={orientation}
                openedFiles={openedFiles}
                selectedFile={selectedFile}
                changeFileContent={changeFileContent}
                selectFile={selectFile}
                closeFile={closeFile}
                theme={theme}
            />
        </>;
}