import Tabs from "../components/nonMobile/Tabs";
import type { File } from "../main";

export default function NonMobileLayout({
    changeLang,
    theme,
    changeTheme,
    orientation,
    changeOrientation,
    files,
    selectFile,
    closeFile
}: {
    changeLang: (lang: "pt-br" | "en") => void,
    theme: string,
    changeTheme: (theme: string) => void,
    orientation: "backwards" | "forwards",
    changeOrientation: (orientation: "backwards" | "forwards") => void,
    files: File[],
    selectFile: (fileName: string) => void,
    closeFile: (fileName: string) => void,
}) {
    const openedFiles = files.filter(f => f.isOpen);

    const selectedFile = files.find(f => f.isSelected) as File;

    return orientation === "backwards" ?
        <>
            <Tabs
                orientation={orientation}
                openedFiles={openedFiles}
                selectedFile={selectedFile}
                selectFile={selectFile}
                closeFile={closeFile}
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
                selectFile={selectFile}
                closeFile={closeFile}
            />
        </>;
}