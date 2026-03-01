import { useState, useEffect } from "react";
import NonMobileLayout from "./layouts/NonMobileLayout";
import MobileLayout from "./layouts/MobileLayout";
import { MAX_MOBILE_WIDTH } from "./main";
import type { AvailableLangs, AvailableOrientations, AvailableThemes, File } from "./main";
import themes from "./utils/themes";
import resume from "./assets/resume.html?raw";

export default function App() {
	const [ width, setWidth ] = useState(window.innerWidth);
	const [ lang, setLang ] = useState<AvailableLangs>("pt-br");
	const [ theme, setTheme ] = useState<AvailableThemes>("default");
	const [ nonMobileOrientation, setNonMobileOrientation ] = useState<AvailableOrientations>("backwards");
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
	const [ fileSelectionStack, setFileSelectionStack ] = useState<string[]>(["currículo.html"]);
	const [ selectedSideBar, setSelectedSideBar ] = useState<"files" | "chat" | undefined>("files");
	const [ settingsPosition, setSettingsPosition ] = useState<{ x: number, y: number }>();

	useEffect(() => {
		const ro = new ResizeObserver(() => {
			setWidth(window.innerWidth);

			const diff = window.innerWidth - width;

			setSettingsPosition(prev => {
				if (prev === undefined)
					return undefined;

				if (nonMobileOrientation === "forwards")
					return prev;

				return {
					x: prev.x + diff,
					y: prev.y
				};
			});
		});

		ro.observe(document.body);

		return () => ro.disconnect();
	}, [width, nonMobileOrientation, settingsPosition?.x, settingsPosition?.y]);

    useEffect(() => {
	    document.documentElement.lang = lang;

        if (lang === "pt-br")
            document.querySelector("title")!.innerText = "Currículo";
        else
            document.querySelector("title")!.innerText = "Resume";
    }, [lang]);

	useEffect(() => {
		Object.entries(themes[theme]).forEach(([themeProp, value]) => {
			document.documentElement.style.setProperty(`--${themeProp}`, value);
		});
	}, [theme]);

    function changeLang(newLang: AvailableLangs) {
        if (newLang === lang)
            return;

        setLang(newLang);

        setFiles(prevFiles => {
            prevFiles[0].name = newLang === "pt-br" ? "currículo.html" : "resume.html";
            return [ ...prevFiles ];
        });
    }

	function changeFileContent(content: string) {
		setFiles(prevFiles => {
			const selectedFile = prevFiles.find(f => f.name === fileSelectionStack.at(-1) as string) as File;

			selectedFile.content = content;

			return [ ...prevFiles ];
		});
	}

	function selectFile(fileName: string) {
		if (fileName === fileSelectionStack.at(-1))
			return;

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
				return [ ...prevFiles ];
			}

			prevFiles[curSelectedFileIndex].isSelected = false;
			prevFiles[fileWithNameIndex].isSelected = true;

			setFileSelectionStack(prevFileSelectionStack => {
				const fileInStackIndex = prevFileSelectionStack.indexOf(fileName);

				if (fileInStackIndex !== -1)
					prevFileSelectionStack.splice(fileInStackIndex, 1);

				prevFileSelectionStack.push(fileName);

				return [ ...prevFileSelectionStack ];
			});

			return [ ...prevFiles ];
		});
	}

	function closeFile(fileName: string) {
		setFiles(prevFiles => {
			const fileIndex = prevFiles.findIndex(f => f.name === fileName);

			if (prevFiles[fileIndex].canClose)
				prevFiles[fileIndex].isOpen = false;

			setFileSelectionStack(prevFileSelectionStack => {
				const fileInStackIndex = prevFileSelectionStack.indexOf(fileName);

				if (fileInStackIndex !== -1)
					prevFileSelectionStack.splice(fileInStackIndex, 1);

				return [ ...prevFileSelectionStack ];
			});

			return [ ...prevFiles ];
		});
	}

	return width <= MAX_MOBILE_WIDTH ?
		<MobileLayout
			changeLang={changeLang}
			theme={theme}
			changeTheme={setTheme}
			files={files}
			selectedFile={files.find(f => f.name === fileSelectionStack.at(-1) as string) as File}
			selectFile={selectFile}
			closeFile={closeFile}
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
			changeFileContent={changeFileContent}
			selectFile={selectFile}
			closeFile={closeFile}
			selectedSideBar={selectedSideBar}
			changeSelectedSideBar={setSelectedSideBar}
			download={download}
			settingsPosition={settingsPosition}
			changeSettingsPosition={setSettingsPosition}
		/>;
}