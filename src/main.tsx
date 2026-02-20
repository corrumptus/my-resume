import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import MobileLayout from "./layouts/MobileLayout";
import NonMobileLayout from "./layouts/NonMobileLayout";
import resume from "./assets/resume.html?raw";
import type themes from "./utils/themes";

export type File = {
	name: string,
	content: string,
	canDelete: boolean,
	isOpen: boolean,
	canClose: boolean,
	isSelected: boolean
};

export type Theme = {
	primaryBgColor: string,
	secondaryBgColor: string,
	folderFileNameColor: string,
	folderSelectedFileBgColor: string,
	selectedFileNameColor: string,
	standbyFileNameColor: string,
	selectedFileColor: string,
	tagName: string,
	tagBracket: string,
	attrName: string,
	attrAssign: string,
	attrValue: string,
	text: string,
	comment: string
};

const MAX_MOBILE_WIDTH = 800;

function Layout() {
	const [ width, setWidth ] = useState(window.innerWidth);
	const [ lang, setLang ] = useState<"pt-br" | "en">("pt-br");
	const [ theme, setTheme ] = useState<keyof typeof themes>("default");
	const [ nonMobileOrientation, setNonMobileOrientation ] = useState<"backwards" | "forwards">("backwards");
	const [ files, setFiles ] = useState<File[]>([
		{
			name: "currículo.html",
			content: resume,
			canDelete: false,
			isOpen: true,
			canClose: false,
			isSelected: true
		}
	]);
	const fileSelectionStack = useRef(["currículo.html"]);

	useEffect(() => {
		const ro = new ResizeObserver(() => setWidth(window.innerWidth));

		ro.observe(document.body);

		return () => ro.disconnect();
	}, []);

	useEffect(() => {
		document.documentElement.lang = lang;

		if (lang === "pt-br") {
			document.querySelector("title")!.innerText = "Currículo";

			setFiles(curFiles => {
				curFiles[0].name = "currículo.html";

				return [...curFiles];
			});
		} else {
			document.querySelector("title")!.innerText = "Resume";

			setFiles(curFiles => {
				curFiles[0].name = "resume.html";

				return [...curFiles];
			});
		}
	}, [lang]);

	function changeFileContent(content: string) {
		setFiles(prevFiles => {
			const selectedFile = prevFiles.find(f => f.name === fileSelectionStack.current.at(-1) as string) as File;

			selectedFile.content = content;

			return [ ...prevFiles ];
		});
	}

	function selectFile(fileName: string) {
		setFiles(prevFiles => {
			let curSelectedFileIndex = null;
			let fileWithNameIndex = null;

			let i = 0;

			while (
				curSelectedFileIndex !== null
				&&
				fileWithNameIndex !== null
				||
				i < prevFiles.length
			) {
				if (prevFiles[i].isSelected)
					curSelectedFileIndex = i;

				if (prevFiles[i].name === fileName)
					fileWithNameIndex = i;

				i++;
			}

			if (curSelectedFileIndex === null || fileWithNameIndex === null) {
				alert(lang === "pt-br" ? "Algo deu errado. A página será recarregada. :(" : "Something went wrong. The page will be reloaded. :(");
				window.location.reload();
				return [...prevFiles];
			}

			prevFiles[curSelectedFileIndex].isSelected = false;
			prevFiles[fileWithNameIndex].isSelected = true;

			const fileInStackIndex = fileSelectionStack.current.indexOf(fileName);

			if (fileInStackIndex !== -1)
				fileSelectionStack.current.splice(fileInStackIndex, 1);

			fileSelectionStack.current.push(fileName);

			return [...prevFiles];
		});
	}

	function closeFile(fileName: string) {
		setFiles(prevFiles => {
			const fileIndex = prevFiles.findIndex(f => f.name === fileName);

			if (prevFiles[fileIndex].canClose)
				prevFiles[fileIndex].isOpen = false;

			const fileInStackIndex = fileSelectionStack.current.indexOf(fileName);

			if (fileInStackIndex !== -1)
				fileSelectionStack.current.splice(fileInStackIndex, 1);

			return [...prevFiles];
		});
	}

	return width <= MAX_MOBILE_WIDTH ?
		<MobileLayout
			changeLang={setLang}
			theme={theme}
			changeTheme={setTheme}
			files={files}
			selectedFile={files.find(f => f.name === fileSelectionStack.current.at(-1) as string) as File}
			selectFile={selectFile}
			closeFile={closeFile}
		/>
		:
		<NonMobileLayout
			changeLang={setLang}
			theme={theme}
			changeTheme={setTheme}
			orientation={nonMobileOrientation}
			changeOrientation={setNonMobileOrientation}
			files={files}
			selectedFile={files.find(f => f.name === fileSelectionStack.current.at(-1) as string) as File}
			changeFileContent={changeFileContent}
			selectFile={selectFile}
			closeFile={closeFile}
		/>;
}

createRoot(document.body).render(<Layout />);