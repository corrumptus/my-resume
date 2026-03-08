import { useState } from "react";
import NonMobileLayout from "./layouts/NonMobileLayout";
import MobileLayout from "./layouts/MobileLayout";
import { MAX_MOBILE_WIDTH } from "./main";
import type { File } from "./main";
import useMutualVariables from "./hooks/useMutualVariables";
import resume from "./assets/resume.html?raw";
import useNonMobileVariables from "./hooks/useNonMobileVariables";
import useMutualFunctions from "./hooks/useMutualFunctions";
import useMobileVariables from "./hooks/useMobileVariables";

export default function App() {
	const [ width, setWidth ] = useState(window.innerWidth);
	const [
		lang,
		setLang,
		theme,
		setTheme,
		files,
		setFiles,
		fileSelectionStack,
		setFileSelectionStack
	] = useMutualVariables();
	const [
		changeLang,
		newFile,
		changeFileContent,
		selectFile,
		closeFile,
		removeFile
	] = useMutualFunctions(lang, setLang, files, setFiles, fileSelectionStack, setFileSelectionStack);
	const [
		nonMobileOrientation,
		setNonMobileOrientation,
		modal,
		setModal,
		selectedSideBar,
		setSelectedSideBar,
		settingsPosition,
		setSettingsPosition,
		option,
		setOption
	] = useNonMobileVariables(width, setWidth);
	const [
		isOpen,
		setIsOpen,
		selectedMenu,
		setSelectedMenu
	] = useMobileVariables();

	function download() {
		const blob = new Blob([resume], { type: "text/html;charset=utf-8" });
    	const url = URL.createObjectURL(blob);

		const link = document.createElement("a");
		link.href = url;
		link.download = lang === "pt-br" ?
			"currículo - Lucas Lazarini.pdf"
			:
			"resume - Lucas Lazarini.pdf";
		link.style.visibility = "hidden";

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		URL.revokeObjectURL(url);
	}

	function downloadFile(file: File) {
		const blob = new Blob([file.content], { type: "text/html;charset=utf-8" });
    	const url = URL.createObjectURL(blob);

		const link = document.createElement("a");
		link.href = url;
		link.download = file.name;
		link.style.visibility = "hidden";

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		URL.revokeObjectURL(url);
	}

	return width <= MAX_MOBILE_WIDTH ?
		<MobileLayout
			lang={lang}
			changeLang={changeLang}
			theme={theme}
			changeTheme={setTheme}
			files={files}
			selectedFile={files.find(f => f.name === fileSelectionStack.at(-1) as string) as File}
			newFile={newFile}
			changeFileContent={changeFileContent}
			selectFile={selectFile}
			closeFile={closeFile}
			selectedMenu={selectedMenu}
			changeSelectedMenu={setSelectedMenu}
			download={download}
			downloadFile={downloadFile}
			remove={removeFile}
			isOpen={isOpen}
			switchIsOpen={() => setIsOpen(prev => !prev)}
		/>
		:
		<NonMobileLayout
			lang={lang}
			changeLang={changeLang}
			theme={theme}
			changeTheme={setTheme}
			orientation={nonMobileOrientation}
			changeOrientation={setNonMobileOrientation}
			files={files}
			selectedFile={files.find(f => f.name === fileSelectionStack.at(-1) as string) as File}
			newFile={newFile}
			changeFileContent={changeFileContent}
			selectFile={selectFile}
			closeFile={closeFile}
			selectedSideBar={selectedSideBar}
			changeSelectedSideBar={setSelectedSideBar}
			download={download}
			downloadFile={downloadFile}
			remove={removeFile}
			settingsPosition={settingsPosition}
			changeSettingsPosition={setSettingsPosition}
			modal={modal}
			changeModal={setModal}
			option={option}
			changeOption={setOption}
		/>;
}