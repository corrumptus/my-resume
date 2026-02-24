import { useState, useEffect } from "react";
import NonMobileLayout from "./layouts/NonMobileLayout";
import MobileLayout from "./layouts/MobileLayout";
import { MAX_MOBILE_WIDTH, type File } from "./main";
import type themes from "./utils/themes";
import resume from "./assets/resume.html?raw";

export default function App() {
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
	const [ fileSelectionStack, setFileSelectionStack ] = useState<string[]>(["currículo.html"]);

	useEffect(() => {
		const ro = new ResizeObserver(() => setWidth(window.innerWidth));

		ro.observe(document.body);

		return () => ro.disconnect();
	}, []);

    useEffect(() => {
	    document.documentElement.lang = lang;

        if (lang === "pt-br")
            document.querySelector("title")!.innerText = "Currículo";
        else
            document.querySelector("title")!.innerText = "Resume";
    }, [lang]);

    function changeLang(newLang: "pt-br" | "en") {
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
		/>;
}